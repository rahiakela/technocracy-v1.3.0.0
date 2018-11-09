// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  REST_URL: 'http://localhost:3000/api',
  accessKeyId: '',
  secretAccessKey: '',
  Bucket: 'tecknocracy',
  CLOUD_IMAGE_PATH: 'https://s3.amazonaws.com/tecknocracy',
  TINYMCE_API_KEY: 'sih8li4gqn3my2tprguwkz32a2hkakah8q55suzv2eubyiig'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
