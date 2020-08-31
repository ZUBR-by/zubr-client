// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from '@zubr-client/zubr-interfaces';

export const environment: Environment = {
  production: true,
  zubrStoreConfig: {
    dataServiceConfig: {
      root: window['env']['apiUrl'],
    },
    // We be used only until API backed gateway is not ready
    altDataServiceConfig: {
      root: '', // Alternative API gateway URL
    },
    maxPageTabsVisible: 5,
    maxPageTabsOpened: 50,
    maxBookmarks: 50,
    snackBarDuration: 3000,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
