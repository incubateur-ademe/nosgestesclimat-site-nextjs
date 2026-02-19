import Script from 'next/script'

export default function ServerTracking() {
  return (
    <Script
      id="global-tracking"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            if (!window.globalTrackingAdded) {
              window.globalTrackingAdded = true;

              // Wait for DOM to be ready
              const initTracking = () => {
                document.addEventListener('click', (e) => {
                  const posthogTarget = e.target.closest('[data-track-posthog]');

                  // Execute tracking asynchronously if attributes are present

                  if (posthogTarget) {
                    const { eventName, properties } = JSON.parse(posthogTarget.dataset.trackPosthog);
                    console.log('Posthog tracking:', { eventName, properties });
                    window.posthog?.capture(eventName, properties);
                  }
                });
              };

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initTracking);
              } else {
                initTracking();
              }
            }
          `,
      }}
    />
  )
}
