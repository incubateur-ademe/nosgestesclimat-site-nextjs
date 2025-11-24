export function toHar(entries, options = {}) {
  // Helper to convert Headers object to HAR header array
  function headersToHar(headers) {
    const harHeaders = []
    if (headers && typeof headers.forEach === 'function') {
      headers.forEach((value, name) => {
        harHeaders.push({ name, value })
      })
    } else if (headers && typeof headers === 'object') {
      for (const name in headers) {
        harHeaders.push({ name, value: headers[name] })
      }
    }
    return harHeaders
  }

  // Helper to extract query string from URL
  function queryStringToHar(url) {
    const out = []
    try {
      const u = new URL(url)
      u.searchParams.forEach((value, name) => {
        out.push({ name, value })
      })
    } catch (e) {}
    return out
  }

  // Helper to get HTTP version (default to HTTP/1.1)
  function getHttpVersion(response) {
    // No standard way to get this from fetch Response, so default
    return 'HTTP/1.1'
  }

  // Build HAR structure
  const har = {
    log: {
      version: '1.2',
      creator: {
        name: options.creatorName || 'CustomHARUtility',
        version: options.creatorVersion || '1.0.0',
      },
      browser: {
        name: options.browserName || 'CustomHARUtility',
        version: options.browserVersion || '1.0.0',
      },
      pages: [
        {
          id: 'page_1',
          startedDateTime: entries.length
            ? new Date(entries[0].timestamp).toISOString()
            : new Date().toISOString(),
          title: options.pageTitle || entries[0]?.request?.referrer || '',
          pageTimings: {
            onContentLoad: -1,
            onLoad: -1,
          },
        },
      ],
      /**
       * @type {unknown[]}
       */
      entries: [],
    },
  }

  // Process each entry
  har.log.entries = entries.map(({ request, response, timestamp }) => {
    const startedDateTime = new Date(timestamp).toISOString()

    // Request body
    let postData = undefined
    if (request.method !== 'GET' && request.body) {
      postData = {
        mimeType: request.headers?.get?.('content-type') || '',
        params: [],
        text: typeof request.body === 'string' ? request.body : '',
      }
    }

    // Response body
    let responseContent = {
      mimeType: response.headers?.get?.('content-type') || '',
      size: parseInt(response.headers?.get?.('content-length') || '0', 10),
      text: '', // You may want to fill this with actual body text if available
    }

    return {
      startedDateTime,
      request: {
        method: request.method,
        url: request.url,
        httpVersion: getHttpVersion(response),
        headers: headersToHar(request.headers),
        queryString: queryStringToHar(request.url),
        cookies: [], // Not handled here
        headersSize: -1, // Not calculated
        bodySize: postData?.text?.length || 0,
        postData,
      },
      response: {
        status: response.status,
        statusText: response.statusText,
        httpVersion: getHttpVersion(response),
        headers: headersToHar(response.headers),
        cookies: [], // Not handled here
        content: responseContent,
        redirectURL: response.headers?.get?.('location') || '',
        headersSize: -1, // Not calculated
        bodySize: responseContent.size,
      },
      cache: {},
      timings: {
        blocked: 0,
        dns: 0,
        connect: 0,
        ssl: 0,
        send: 0,
        wait: 0,
        receive: 0,
      },
      time: 0,
      pageref: 'page_1',
    }
  })

  return har
}
