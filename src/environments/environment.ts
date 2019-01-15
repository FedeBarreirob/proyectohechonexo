// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlSeguridadLogin: 'http://localhost:8080/DigitalSeguridad-1.0-SNAPSHOT/api/autentificacion/login',
  urlCuentaCorrienteListado: 'http://localhost:8080/DigitalCuentaCorriente-1.0-SNAPSHOT/api/CuentaCorriente/listado',
  urlCuentaCorrienteAplicadaListado: 'http://localhost:8080/DigitalCuentaCorriente-1.0-SNAPSHOT/api/CuentaAplicadaCorriente/listado',
  urlEntregasListado: 'http://localhost:8080/DigitalEntregasYVentas-1.0-SNAPSHOT/api/Entregas/listado',
  urlVentasListado: 'http://localhost:8080/DigitalEntregasYVentas-1.0-SNAPSHOT/api/Ventas/listado',
  urlMercaderiaPendienteEntregarListado: 'http://localhost:8080/DigitalEntregasYVentas-1.0-SNAPSHOT/api/MercaderiaPendienteDeEntregar/listado',
  urlComprobantesPendientesDeFacturarListado: 'http://localhost:8080/DigitalEntregasYVentas-1.0-SNAPSHOT/api/ComprobantesPendientesDeFacturar/listado',
  urlSeguridadPerfilRegistrar: 'http://localhost:8080/DigitalSeguridad-1.0-SNAPSHOT/api/perfiles/registrar',
  urlSeguridadPerfilListar: 'http://localhost:8080/DigitalSeguridad-1.0-SNAPSHOT/api/perfiles/lista',
  urlSeguridadPerfilModificar: 'http://localhost:8080/DigitalSeguridad-1.0-SNAPSHOT/api/perfiles/modificar',
  urlSeguridadPerfilLogueado: 'http://localhost:8080/DigitalSeguridad-1.0-SNAPSHOT/api/perfiles/perfil',
  urlSeguridadTerceroRegistrar: 'http://localhost:8080/DigitalSeguridad-1.0-SNAPSHOT/api/terceros/registrar',
  urlSeguridadTerceroListar: 'http://localhost:8080/DigitalSeguridad-1.0-SNAPSHOT/api/terceros/lista',
  urlSeguridadTerceroModificar: 'http://localhost:8080/DigitalSeguridad-1.0-SNAPSHOT/api/terceros/modificar',
  urlVentasFiltrosEspecieCosecha: 'http://localhost:8080/DigitalEntregasYVentas-1.0-SNAPSHOT/api/Ventas/filtrosEspecieCosechas',
  urlEntregasFiltrosEspecieCosecha: 'http://localhost:8080/DigitalEntregasYVentas-1.0-SNAPSHOT/api/Entregas/filtrosEspecieCosechas',
  urlOtrosMovimientosListado: 'http://localhost:8080/DigitalEntregasYVentas-1.0-SNAPSHOT/api/OtrosMovimientos/listado',
  urlOtrosMovimientosFiltrosEspecieCosecha: 'http://localhost:8080/DigitalEntregasYVentas-1.0-SNAPSHOT/api/OtrosMovimientos/filtrosEspecieCosechas'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
