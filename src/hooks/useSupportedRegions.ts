//TODO: should check if PR is in query params but it is kind of difficult to do in a server component

export const useSupportedRegions = () =>
  fetch(
    `${
      // process.env.NEXT_PUBLIC_LOCAL_DATA_SERVER ??
      'https://deploy-preview-2085--ecolab-data.netlify.app'
    }/supportedRegions.json`
  ).then((response) => response.json())
