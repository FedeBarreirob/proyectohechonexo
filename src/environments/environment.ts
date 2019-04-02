// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hostSeguridad: 'http://localhost:8080/DigitalSeguridad-1.0-SNAPSHOT/api',
  hostCtaCte: 'http://localhost:8080/DigitalCuentaCorriente-1.0-SNAPSHOT/api',
  hostEntregasYVentas: 'http://localhost:8080/DigitalEntregasYVentas-1.0-SNAPSHOT/api',
  hostComunicaciones: 'http://localhost:8080/Comunicaciones-1.0-SNAPSHOT/api',
  hostGeneradorComprobantes: 'http://localhost:8080/GeneradorComprobantes-1.0-SNAPSHOT/api',
  baseUrl: 'http://localhost:4200/#'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
