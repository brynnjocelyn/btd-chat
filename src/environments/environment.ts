// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'https://btdapi.bknight.dev',
  pbBaseUrl: 'https://btdpb.bknight.dev',
  socketUrl: 'http://localhost:3000',
  googleClientId: 'YOUR_GOOGLE',
  uspsUserId: '',
  uspsStaging: false,
  zipCodeApi: 'https://app.zipcodebase.com/api/v1/search',
  zipCodeApiKey: '24357610-2ddd-11ef-a655-2d9dee7a14b2',
  apiHealthCheckInterval: 1000 * 60 * 5, // 5 minutes
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
