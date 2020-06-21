// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  inPhonegap: false,
  oneSignalApiKey: '39901250-6212-4942-9d7a-413712e251fb',
  googleAnalyticsID: 'UA-144101541-1',
  trackear: false,

  // local
  /*hostSeguridad: 'http://localhost:8080/DigitalSeguridad-1.0-SNAPSHOT/api',
  hostCtaCte: 'http://localhost:8080/DigitalCuentaCorriente-1.0-SNAPSHOT/api',
  hostEntregasYVentas: 'http://localhost:8080/DigitalEntregasYVentas-1.0-SNAPSHOT/api',
  hostComunicaciones: 'http://localhost:8080/Comunicaciones-1.0-SNAPSHOT/api',
  hostGeneradorComprobantes: 'http://localhost:8080/GeneradorComprobantes-1.0-SNAPSHOT/api',
  baseUrl: 'http://localhost:4200/#'*/


  // testing
   
  hostSeguridad: 'http://192.168.20.66:8080/DigitalSeguridad-1.0-SNAPSHOT/api',
  hostCtaCte: 'http://192.168.20.66:8080/DigitalCuentaCorriente-1.0-SNAPSHOT/api',
  hostEntregasYVentas: 'http://192.168.20.66:8080/DigitalEntregasYVentas-1.0-SNAPSHOT/api',
  hostComunicaciones: 'http://192.168.20.66:8080/Comunicaciones-1.0-SNAPSHOT/api',
  hostGeneradorComprobantes: 'http://192.168.20.66:8080/GeneradorComprobantes-1.0-SNAPSHOT/api',
  hostFinanzas: 'http://192.168.20.66:8080/DigitalFinanzas-1.0-SNAPSHOT/api',
  baseUrl: 'http://192.168.20.66/DigitalUIClientes/#'

  //produccion por vpn
  /*
  hostSeguridad: 'http://192.168.20.63:8080/DigitalSeguridad-1.0-SNAPSHOT/api',
  hostCtaCte: 'http://192.168.20.63:8080/DigitalCuentaCorriente-1.0-SNAPSHOT/api',
  hostEntregasYVentas: 'http://192.168.20.63:8080/DigitalEntregasYVentas-1.0-SNAPSHOT/api',
  hostComunicaciones: 'http://192.168.20.63:8080/Comunicaciones-1.0-SNAPSHOT/api',
  hostGeneradorComprobantes: 'http://192.168.20.63:8080/GeneradorComprobantes-1.0-SNAPSHOT/api',
  baseUrl: 'http://192.168.20.63/DigitalUIClientes/#'*/

  // produccion
  /*hostSeguridad: 'https://digital.gaviglio.com:8443/DigitalSeguridad-1.0-SNAPSHOT/api',
  hostCtaCte: 'https://digital.gaviglio.com:8443/DigitalCuentaCorriente-1.0-SNAPSHOT/api',
  hostEntregasYVentas: 'https://digital.gaviglio.com:8443/DigitalEntregasYVentas-1.0-SNAPSHOT/api',
  hostComunicaciones: 'https://digital.gaviglio.com:8443/Comunicaciones-1.0-SNAPSHOT/api',
  hostGeneradorComprobantes: 'https://digital.gaviglio.com:8443/GeneradorComprobantes-1.0-SNAPSHOT/api',
  baseUrl: 'https://digital.gaviglio.com/DigitalUIClientes/#'*/
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
