// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://5e746f328d9bbcb3b59dad8d74d292d3@o4507678112677888.ingest.us.sentry.io/4507678115364864",


  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
  beforeSend(event) {
    // Modify or filter out specific events
    if (event.level === 'error' && event.exception) {
      // You can filter out specific errors or exceptions
      return event;
    }
    return null;
  },
});
