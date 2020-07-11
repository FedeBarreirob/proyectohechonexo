import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { EllipsisModule } from 'ngx-ellipsis';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxSpinnerModule } from 'ngx-spinner';

// swiper
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
	direction: 'horizontal',
	slidesPerView: 'auto'
};

// locale
import { registerLocaleData, DecimalPipe, CommonModule, DatePipe } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { CustomPaginatorEspanol } from './internacionalizacion/paginador-espanol';

// Animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Material
import { MaterialModule } from './material';

import { JwtInterceptor } from './interceptors/security/jwt.interceptor'

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/tablero/dashboard/dashboard.component';
import { MainNavComponent } from './components/menu/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatPaginatorIntl, MatAutocompleteModule, MatInputModule } from '@angular/material';
import { CtacteComponent } from './components/listados/cta-cte/ctacte/ctacte.component';
import { CtacteDetalleComponent } from './components/listados/cta-cte/ctacte.detalle/ctacte.detalle.component';
import { CtacteAplicadaComponent } from './components/listados/cta-cte-aplicada/ctacte-aplicada/ctacte-aplicada.component';
import { CtacteAplicadaDetalleComponent } from './components/listados/cta-cte-aplicada/ctacte-aplicada-detalle/ctacte-aplicada-detalle.component';
import { EntregasComponent } from './components/listados/entregas/entregas/entregas.component';
import { EntregasDetalleComponent } from './components/listados/entregas/entregas-detalle/entregas-detalle.component';
import { VentasComponent } from './components/listados/ventas/ventas/ventas.component';
import { VentasDetalleComponent } from './components/listados/ventas/ventas-detalle/ventas-detalle.component';
import { MercPendEntregarComponent } from './components/listados/merc-pend-entregar/merc-pend-entregar/merc-pend-entregar.component';
import { MercPendEntregarDetalleDesktopComponent } from './components/listados/merc-pend-entregar/merc-pend-entregar-detalle-desktop/merc-pend-entregar-detalle-desktop.component';
import { ComprobantesPendFacturarComponent } from './components/listados/comprobantes-pend-facturar/comprobantes-pend-facturar/comprobantes-pend-facturar.component';
import { ComprobantesPendFacturarDetalleDesktopComponent } from './components/listados/comprobantes-pend-facturar/comprobantes-pend-facturar-detalle-desktop/comprobantes-pend-facturar-detalle-desktop.component';
import { CtacteMasOperacionesComponent } from './components/listados/cta-cte/ctacte-mas-operaciones/ctacte-mas-operaciones.component';
import { CtacteDetalleMasOperacionesComponent } from './components/listados/cta-cte/ctacte-detalle-mas-operaciones/ctacte-detalle-mas-operaciones.component';
import { CtaCteAplicadaMasOperacionesComponent } from './components/listados/cta-cte-aplicada/cta-cte-aplicada-mas-operaciones/cta-cte-aplicada-mas-operaciones.component';
import { CtaCteAplicadaDetalleMasOperacionesComponent } from './components/listados/cta-cte-aplicada/cta-cte-aplicada-detalle-mas-operaciones/cta-cte-aplicada-detalle-mas-operaciones.component';
import { EntregasMasOperacionesComponent } from './components/listados/entregas/entregas-mas-operaciones/entregas-mas-operaciones.component';
import { VentasMasOperacionesComponent } from './components/listados/ventas/ventas-mas-operaciones/ventas-mas-operaciones.component';
import { MercPendEntregarHeaderItemDesktopComponent } from './components/listados/merc-pend-entregar/merc-pend-entregar-header-item-desktop/merc-pend-entregar-header-item-desktop.component';
import { MercPendEntregarItemDesktopComponent } from './components/listados/merc-pend-entregar/merc-pend-entregar-item-desktop/merc-pend-entregar-item-desktop.component';
import { ComprobantesPendFacturarListaDesktopComponent } from './components/listados/comprobantes-pend-facturar/comprobantes-pend-facturar-lista-desktop/comprobantes-pend-facturar-lista-desktop.component';
import { MercPendEntregarListaDesktopComponent } from './components/listados/merc-pend-entregar/merc-pend-entregar-lista-desktop/merc-pend-entregar-lista-desktop.component';
import { PerfilesListadoComponent } from './components/usuarios-y-perfiles/perfiles/perfiles-listado/perfiles-listado.component';
import { PerfilesEdicionComponent } from './components/usuarios-y-perfiles/perfiles/perfiles-edicion/perfiles-edicion.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AccesoTercerosComponent } from './components/usuarios-y-perfiles/terceros/acceso-terceros/acceso-terceros.component';
import { AccesoTercerosEdicionComponent } from './components/usuarios-y-perfiles/terceros/acceso-terceros-edicion/acceso-terceros-edicion.component';
import { OtrosMovimientosComponent } from './components/listados/otros-movimientos/otros-movimientos/otros-movimientos.component';
import { OtrosMovimientosDetalleComponent } from './components/listados/otros-movimientos/otros-movimientos-detalle/otros-movimientos-detalle.component';
import { OtrosMovimientosMasOperacionesComponent } from './components/listados/otros-movimientos/otros-movimientos-mas-operaciones/otros-movimientos-mas-operaciones.component';
import { OtrosMovimientosDetalleMasOperacionesComponent } from './components/listados/otros-movimientos/otros-movimientos-detalle-mas-operaciones/otros-movimientos-detalle-mas-operaciones.component';
import { SelectorCuentasComponent } from './components/menu/selector-cuentas/selector-cuentas.component';
import { ComboCuentaComponent } from './components/common/combo-cuenta/combo-cuenta.component';
import { InformacionDePerfilComponent } from './components/usuarios-y-perfiles/informacion-de-perfil/informacion-de-perfil.component';
import { ArchivoDeComprobantesComponent } from './components/listados/comprobantes/descargas-comprobantes/archivo-de-comprobantes/archivo-de-comprobantes.component';
import { RecuperacionPasswordComponent } from './components/usuarios-y-perfiles/recuperacion-password/recuperacion-password.component';
import { RestablecimientoPasswordComponent } from './components/usuarios-y-perfiles/restablecimiento-password/restablecimiento-password.component';
import { ModalCambioPasswordComponent } from './components/usuarios-y-perfiles/modal-cambio-password/modal-cambio-password.component';
import { SolicitudAltaComponent } from './components/usuarios-y-perfiles/solicitud-alta/solicitud-alta.component';
import { BuzonComponent } from './components/notificaciones/buzon/buzon.component';
import { AccesoBuzonComponent } from './components/notificaciones/acceso-buzon/acceso-buzon.component';
import { NotificacionDetalleComponent } from './components/notificaciones/notificacion-detalle/notificacion-detalle.component';
import { KilosAPipe } from './pipes/kilos-a.pipe';
import { KilosTextoAPipe } from './pipes/kilos-texto-a.pipe';
import { InfoPerfilComponent } from './components/menu/info-perfil/info-perfil.component';
import { LinkMenuComponent } from './components/menu/link-menu/link-menu.component';
import { ToolBarGeneralComponent } from './components/menu/tool-bar-general/tool-bar-general.component';
import { AvatarDelPerfilComponent } from './components/common/avatar-del-perfil/avatar-del-perfil.component';
import { CerealesFiltroComponent } from './components/filtros/cereales-filtro/cereales-filtro.component';
import { ReporteFiltroDesktopComponent } from './components/filtros/reporte-filtro-desktop/reporte-filtro-desktop.component';
import { ImagenEspeciePipe } from './pipes/imagen-especie.pipe';
import { EntregasListaDesktopComponent } from './components/listados/entregas/entregas-lista-desktop/entregas-lista-desktop.component';
import { EntregasListaMovilComponent } from './components/listados/entregas/entregas-lista-movil/entregas-lista-movil.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToolBarParaModalComponent } from './components/menu/tool-bar-para-modal/tool-bar-para-modal.component';
import { VentasListaMovilComponent } from './components/listados/ventas/ventas-lista-movil/ventas-lista-movil.component';
import { VentasListaDesktopComponent } from './components/listados/ventas/ventas-lista-desktop/ventas-lista-desktop.component';
import { MonedaPipe } from './pipes/moneda.pipe';
import { CuentaCorrienteComponent } from './components/listados/cuenta-corriente/cuenta-corriente/cuenta-corriente.component';
import { CuentaCorrienteListaComponent } from './components/listados/cuenta-corriente/cuenta-corriente-lista/cuenta-corriente-lista.component';
import { CtaCteFiltroComponent } from './components/filtros/cta-cte-filtro/cta-cte-filtro.component';
import { ContratosComponent } from './components/listados/contratos/contratos/contratos.component';
import { ContratosListaMovilComponent } from './components/listados/contratos/contratos-lista-movil/contratos-lista-movil.component';
import { ContratosDetalleComponent } from './components/listados/contratos/contratos-detalle/contratos-detalle.component';
import { ContratosResumenItemMovilComponent } from './components/listados/contratos/contratos-resumen-item-movil/contratos-resumen-item-movil.component';
import { ContratoEntregasDetalleComponent } from './components/listados/contratos/contrato-entregas-detalle/contrato-entregas-detalle.component';
import { ContratoVentasDetalleComponent } from './components/listados/contratos/contrato-ventas-detalle/contrato-ventas-detalle.component';
import { SaldoCtaCteAplicadaGlobalComponent } from './components/tablero/saldo-cta-cte-aplicada-global/saldo-cta-cte-aplicada-global.component';
import { FechaHoraComponent } from './components/tablero/fecha-hora/fecha-hora.component';
import { ContratoIndicadorEntregasYVentasComponent } from './components/tablero/indicadoresContrato/contrato-indicador-entregas-yventas/contrato-indicador-entregas-yventas.component';
import { ContratoIndicadorEntregaComponent } from './components/tablero/indicadoresContrato/contrato-indicador-entrega/contrato-indicador-entrega.component';
import { ContratoIndicadorVentaComponent } from './components/tablero/indicadoresContrato/contrato-indicador-venta/contrato-indicador-venta.component';
import { ContratoIndicadorSwiperEntregaComponent } from './components/tablero/indicadoresContrato/contrato-indicador-swiper-entrega/contrato-indicador-swiper-entrega.component';
import { ContratoIndicadorSwiperVentasComponent } from './components/tablero/indicadoresContrato/contrato-indicador-swiper-ventas/contrato-indicador-swiper-ventas.component';
import { ContratoIndicadorEntregasRecientesComponent } from './components/tablero/indicadoresContrato/contrato-indicador-entregas-recientes/contrato-indicador-entregas-recientes.component';
import { ContratoIndicadorVentasRecientesComponent } from './components/tablero/indicadoresContrato/contrato-indicador-ventas-recientes/contrato-indicador-ventas-recientes.component';
import { PanelNotificacionesComponent } from './components/notificaciones/panel-notificaciones/panel-notificaciones.component';
import { PanelNotificacionesItemComponent } from './components/notificaciones/panel-notificaciones-item/panel-notificaciones-item.component';
import { CuentaCorrienteAplicadaListaComponent } from './components/listados/cuenta-corriente/cuenta-corriente-aplicada-lista/cuenta-corriente-aplicada-lista.component';
import { CuentaCorrienteDetalleComponent } from './components/listados/cuenta-corriente/cuenta-corriente-detalle/cuenta-corriente-detalle.component';
import { FiltroCosechaComponent } from './components/filtros/filtro-cosecha/filtro-cosecha.component';
import { LoadingComponent } from './components/common/loading/loading.component';
import { TercerosListaMovilComponent } from './components/usuarios-y-perfiles/terceros/terceros-lista-movil/terceros-lista-movil.component';
import { InfoPerfilCambioPasswordComponent } from './components/usuarios-y-perfiles/info-perfil-cambio-password/info-perfil-cambio-password.component';
import { InfoPerfilEdicionComponent } from './components/usuarios-y-perfiles/info-perfil-edicion/info-perfil-edicion.component';
import { AvatarEditorComponent } from './components/usuarios-y-perfiles/avatar-editor/avatar-editor.component';
import { ContratoIndicadorVentaPesificadasComponent } from './components/tablero/indicadoresContrato/contrato-indicador-venta-pesificadas/contrato-indicador-venta-pesificadas.component';
import { ContratoIndicadorSwiperVentasPesificadasComponent } from './components/tablero/indicadoresContrato/contrato-indicador-swiper-ventas-pesificadas/contrato-indicador-swiper-ventas-pesificadas.component';
import { ContratoIndicadorVentaLiquidadasComponent } from './components/tablero/indicadoresContrato/contrato-indicador-venta-liquidadas/contrato-indicador-venta-liquidadas.component';
import { ContratoIndicadorSwiperVentasLiquidadasComponent } from './components/tablero/indicadoresContrato/contrato-indicador-swiper-ventas-liquidadas/contrato-indicador-swiper-ventas-liquidadas.component';
import { CuentaCorrienteSaldosComponent } from './components/listados/cuenta-corriente/cuenta-corriente-saldos/cuenta-corriente-saldos.component';
import { CuentaCorrienteAplicadaSaldoComponent } from './components/listados/cuenta-corriente/cuenta-corriente-aplicada-saldo/cuenta-corriente-aplicada-saldo.component';
import { ComprobantesComponent } from './components/listados/comprobantes/comprobantes/comprobantes.component';
import { FiltroArchivosComprobantesComponent } from './components/listados/comprobantes/descargas-comprobantes/filtro-archivos-comprobantes/filtro-archivos-comprobantes.component';
import { PrecioQQAPipe } from './pipes/precio-qqa.pipe';
import { TenenciasImpositivasComponent } from './components/listados/reportes/tenencias-impositivas/tenencias-impositivas/tenencias-impositivas.component';
import { CuentaCorrienteAplicadaDetalleComponent } from './components/listados/cuenta-corriente/cuenta-corriente-aplicada-detalle/cuenta-corriente-aplicada-detalle.component';
import { TenenciaImpositivaDetalleComponent } from './components/listados/reportes/tenencias-impositivas/tenencia-impositiva-detalle/tenencia-impositiva-detalle.component';
import { ReportesComponent } from './components/listados/reportes/reportes/reportes.component';
import { NetasAPipe } from './pipes/netas-a.pipe';
import { SaldoCtaCteAplicadaGlobalACobrarComponent } from './components/tablero/saldo-cta-cte-aplicada-global-acobrar/saldo-cta-cte-aplicada-global-acobrar.component';
import { SaldoCtaCteAplicadaGlobalAPagarComponent } from './components/tablero/saldo-cta-cte-aplicada-global-apagar/saldo-cta-cte-aplicada-global-apagar.component';
import { ContratosListaDesktopComponent } from './components/listados/contratos/contratos-lista-desktop/contratos-lista-desktop.component';
import { ContratosResumenItemDesktopComponent } from './components/listados/contratos/contratos-resumen-item-desktop/contratos-resumen-item-desktop.component';
import { ContratosResumenHeaderItemDesktopComponent } from './components/listados/contratos/contratos-resumen-header-item-desktop/contratos-resumen-header-item-desktop.component';
import { CerealesFiltroDesktopComponent } from './components/filtros/cereales-filtro-desktop/cereales-filtro-desktop.component';
import { ContratoDetalleDesktopComponent } from './components/listados/contratos/contrato-detalle-desktop/contrato-detalle-desktop.component';
import { ContratoIndicadorGraficoPorcentualComponent } from './components/listados/contratos/contrato-indicador-grafico-porcentual/contrato-indicador-grafico-porcentual.component';
import { EntregasHeaderItemDesktopComponent } from './components/listados/entregas/entregas-header-item-desktop/entregas-header-item-desktop.component';
import { ComprobantesPendFacturarHeaderItemDesktopComponent } from './components/listados/comprobantes-pend-facturar/comprobantes-pend-facturar-header-item-desktop/comprobantes-pend-facturar-header-item-desktop.component';
import { EntregasItemDesktopComponent } from './components/listados/entregas/entregas-item-desktop/entregas-item-desktop.component';
import { ComprobantesPendFacturarItemDesktopComponent } from './components/listados/comprobantes-pend-facturar/comprobantes-pend-facturar-item-desktop/comprobantes-pend-facturar-item-desktop.component';
import { EntregasDetalleDesktopComponent } from './components/listados/entregas/entregas-detalle-desktop/entregas-detalle-desktop.component';
import { VentasHeaderItemDesktopComponent } from './components/listados/ventas/ventas-header-item-desktop/ventas-header-item-desktop.component';
import { VentasItemDesktopComponent } from './components/listados/ventas/ventas-item-desktop/ventas-item-desktop.component';
import { VentasDetalleDesktopComponent } from './components/listados/ventas/ventas-detalle-desktop/ventas-detalle-desktop.component';
import { CtaCteFiltroDesktopComponent } from './components/filtros/cta-cte-filtro-desktop/cta-cte-filtro-desktop.component';
import { CuentaCorrienteListaDesktopComponent } from './components/listados/cuenta-corriente/cuenta-corriente-lista-desktop/cuenta-corriente-lista-desktop.component';
import { CuentaCorrienteAplicadaListaDesktopComponent } from './components/listados/cuenta-corriente/cuenta-corriente-aplicada-lista-desktop/cuenta-corriente-aplicada-lista-desktop.component';
import { CuentaCorrienteHeaderItemDesktopComponent } from './components/listados/cuenta-corriente/cuenta-corriente-header-item-desktop/cuenta-corriente-header-item-desktop.component';
import { CuentaCorrienteItemDesktopComponent } from './components/listados/cuenta-corriente/cuenta-corriente-item-desktop/cuenta-corriente-item-desktop.component';
import { CuentaCorrienteAplicadaHeaderItemDesktopComponent } from './components/listados/cuenta-corriente/cuenta-corriente-aplicada-header-item-desktop/cuenta-corriente-aplicada-header-item-desktop.component';
import { CuentaCorrienteAplicadaItemDesktopComponent } from './components/listados/cuenta-corriente/cuenta-corriente-aplicada-item-desktop/cuenta-corriente-aplicada-item-desktop.component';
import { CuentaCorrienteDetalleDesktopComponent } from './components/listados/cuenta-corriente/cuenta-corriente-detalle-desktop/cuenta-corriente-detalle-desktop.component';
import { CuentaCorrienteAplicadaDetalleDesktopComponent } from './components/listados/cuenta-corriente/cuenta-corriente-aplicada-detalle-desktop/cuenta-corriente-aplicada-detalle-desktop.component';
import { InformacionDePerfilDesktopComponent } from './components/usuarios-y-perfiles/informacion-de-perfil-desktop/informacion-de-perfil-desktop.component';
import { InfoPerfilEdicionDesktopComponent } from './components/usuarios-y-perfiles/info-perfil-edicion-desktop/info-perfil-edicion-desktop.component';
import { SelectorUnidadMedidaComponent } from './components/usuarios-y-perfiles/selector-unidad-medida/selector-unidad-medida.component';
import { TercerosListaDesktopComponent } from './components/usuarios-y-perfiles/terceros/terceros-lista-desktop/terceros-lista-desktop.component';
import { EditaTuPerfilDesktopComponent } from './components/usuarios-y-perfiles/edita-tu-perfil-desktop/edita-tu-perfil-desktop.component';
import { AccesoTercerosEdicionDesktopComponent } from './components/usuarios-y-perfiles/terceros/acceso-terceros-edicion-desktop/acceso-terceros-edicion-desktop.component';
import { LoginLayoutComponent } from './components/layouts/login-layout/login-layout.component';
import { HomeLayoutComponent } from './components/layouts/home-layout/home-layout.component';
import { ContratoIndicadorSwiperVentasPagosComponent } from './components/tablero/indicadoresContrato/contrato-indicador-swiper-ventas-pagos/contrato-indicador-swiper-ventas-pagos.component';
import { ContratoIndicadorVentaPagosComponent } from './components/tablero/indicadoresContrato/contrato-indicador-venta-pagos/contrato-indicador-venta-pagos.component';
import { ToolBarDescargasComponent } from './components/common/tool-bar-descargas/tool-bar-descargas.component';
import { EntregasIndicadorGlobalComponent } from './components/listados/entregas/entregas-indicador-global/entregas-indicador-global.component';
import { VentasIndicadorGlobalComponent } from './components/listados/ventas/ventas-indicador-global/ventas-indicador-global.component';
import { EntregasItemMovilComponent } from './components/listados/entregas/entregas-item-movil/entregas-item-movil.component';
import { VentasItemMovilComponent } from './components/listados/ventas/ventas-item-movil/ventas-item-movil.component';
import { CuentaCorrienteItemMovilComponent } from './components/listados/cuenta-corriente/cuenta-corriente-item-movil/cuenta-corriente-item-movil.component';
import { CuentaCorrienteAplicadaItemMovilComponent } from './components/listados/cuenta-corriente/cuenta-corriente-aplicada-item-movil/cuenta-corriente-aplicada-item-movil.component';
import { TutorialModalComponent } from './components/common/tutorial-modal/tutorial-modal.component';
import { NotificacionDetalleUrlComponent } from './components/notificaciones/notificacion-detalle-url/notificacion-detalle-url.component';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';
import { SeleccionadosModalComponent } from './components/listados/comprobantes/descargas-comprobantes/seleccionados-modal/seleccionados-modal.component';
import { ReporteUsuariosComponent } from './components/listados/reportes/reporte-usuarios/reporte-usuarios/reporte-usuarios.component';
import { ReporteUsuariosToolbarComponent } from './components/listados/reportes/reporte-usuarios/reporte-usuarios-toolbar/reporte-usuarios-toolbar.component';
import { ReporteProductoresComponent } from './components/listados/reportes/reporte-productores/reporte-productores/reporte-productores.component';
import { ReporteProductoresToolbarComponent } from './components/listados/reportes/reporte-productores/reporte-productores-toolbar/reporte-productores-toolbar.component';
import { SaldoConDiferenciaDeCamioEIvaComponent } from './components/listados/cuenta-corriente/saldo-con-diferencia-de-camio-eiva/saldo-con-diferencia-de-camio-eiva.component';
import { LongPressDirective } from './directives/long-press.directive';
import { BilleteraComponent } from './components/listados/billetera/billetera/billetera.component';
import { BilleteraPagarComponent } from './components/listados/billetera/billetera-pagar/billetera-pagar.component';
import { BilleteraCobrarComponent } from './components/listados/billetera/billetera-cobrar/billetera-cobrar.component';
import { TarjetaTabContainerComponent } from './components/listados/billetera/tarjeta-tab-container/tarjeta-tab-container.component';
import { PagarCobrarContainerComponent } from './components/listados/billetera/pagar-cobrar-container/pagar-cobrar-container.component';
import { TablaOperacionesRecientesComponent } from './components/listados/billetera/tabla-operaciones-recientes/tabla-operaciones-recientes.component';
import { ListaOperacionesMovilComponent } from './components/listados/billetera/lista-operaciones-movil/lista-operaciones-movil.component';
import { TarjetaTabContainerWeb1Component } from './components/listados/billetera/tarjeta-tab-container-web1/tarjeta-tab-container-web1.component';
import { TarjetaTabContainerWebComponent } from './components/listados/billetera/tarjeta-tab-container-web/tarjeta-tab-container-web.component';
import { SaldoTcComponent } from './components/listados/billetera/saldo-tc/saldo-tc.component';
import { BilleteraAcobrarDesktopComponent } from './components/listados/billetera/billetera-acobrar-desktop/billetera-acobrar-desktop.component';
import { BilleteraApagarDesktopComponent } from './components/listados/billetera/billetera-apagar-desktop/billetera-apagar-desktop.component';
import { BilleteraAcobrarResumenItemComponent } from './components/listados/billetera/billetera-acobrar-resumen-item/billetera-acobrar-resumen-item.component';
import { BilleteraOperacionesItemComponent } from './components/listados/billetera/billetera-operaciones-item/billetera-operaciones-item.component';
import { PagarCobrarContainerDesktopComponent } from './components/listados/billetera/pagar-cobrar-container-desktop/pagar-cobrar-container-desktop.component';
import { BilleteraCobrarCardComponent } from './components/listados/billetera/billetera-cobrar/billetera-cobrar-card/billetera-cobrar-card.component';
import { BilleteraCobrarListComponent } from './components/listados/billetera/billetera-cobrar/billetera-cobrar-list/billetera-cobrar-list.component';
import { BilleteraCobrarCardCobroComponent } from './components/listados/billetera/billetera-cobrar/billetera-cobrar-card-cobro/billetera-cobrar-card-cobro.component';
import { BilleteraCobrarCardTotalComponent } from './components/listados/billetera/billetera-cobrar/billetera-cobrar-card-total/billetera-cobrar-card-total.component';
import { BilleteraCobrarCuentaComponent } from './components/listados/billetera/billetera-cobrar/billetera-cobrar-cuenta/billetera-cobrar-cuenta.component';
import { BilleteraSaldoMovilComponent } from './components/listados/billetera/billetera-saldo-movil/billetera-saldo-movil.component';
import { BilleteraLiquidacionesDetalleComponent } from './components/listados/billetera/billetera-liquidaciones-detalle/billetera-liquidaciones-detalle.component';
import { BilleteraLiquidacionesDetalleUnaLiquidacionComponent } from './components/listados/billetera/billetera-liquidaciones-detalle-una-liquidacion/billetera-liquidaciones-detalle-una-liquidacion.component';
import { BilleteraCobrarIndicacionImportesComponent } from './components/listados/billetera/billetera-cobrar/billetera-cobrar-indicacion-importes/billetera-cobrar-indicacion-importes/billetera-cobrar-indicacion-importes.component';
import { BilleteraCobrarResumenComponent } from './components/listados/billetera/billetera-cobrar/billetera-cobrar-resumen/billetera-cobrar-resumen.component';
import { BilleteraCobrarResumenTotalComponent } from './components/listados/billetera/billetera-cobrar/billetera-cobrar-resumen-total/billetera-cobrar-resumen-total.component';
import { CuentaBancariaSelectorComponent } from './components/common/cuenta-bancaria-selector/cuenta-bancaria-selector.component';
import { PagarFiltroComponent } from './components/listados/billetera/billetera-pagar/pagar-filtro/pagar-filtro.component';
import { PagarInfoComponent } from './components/listados/billetera/billetera-pagar/pagar-info/pagar-info.component';
import { PagarListadoComponent } from './components/listados/billetera/billetera-pagar/pagar-listado/pagar-listado.component';
import { PagarComprobantesTotalComponent } from './components/listados/billetera/billetera-pagar/pagar-comprobantes-total/pagar-comprobantes-total.component';
import { PagarListadoConceptoAPagarComponent } from './components/listados/billetera/billetera-pagar/pagar-listado-concepto-apagar/pagar-listado-concepto-apagar.component';
import { BilleteraCardInfoComponent } from './components/listados/billetera/billetera-card-info/billetera-card-info.component';
import { TotalPagarPagosComponent } from './components/listados/billetera/billetera-pagar/total-pagar-pagos/total-pagar-pagos.component';
import { PagosOpcionesComponent } from './components/listados/billetera/billetera-pagar/pagos-opciones/pagos-opciones.component';
import { PagarCanjeTotalComponent } from './components/listados/billetera/billetera-pagar/pagar-canje-total/pagar-canje-total.component';
import { PagarCanjeInfoComponent } from './components/listados/billetera/billetera-pagar/pagar-canje-info/pagar-canje-info.component';
import { CardPagarStockComponent } from './components/listados/billetera/billetera-pagar/card-pagar-stock/card-pagar-stock.component';
import { PagoConCanjeComponent } from './components/listados/billetera/billetera-pagar/pago-con-canje/pago-con-canje.component';
import { PagoConCanjeDisponibleComponent } from './components/listados/billetera/billetera-pagar/pago-con-canje-disponible/pago-con-canje-disponible.component';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { PrecioTNAPipe } from './pipes/precio-tna.pipe';
import { PreciosDeGranosComponent } from './components/listados/billetera/billetera-pagar/precios-de-granos/precios-de-granos.component';
import { GestionDeSolicitudesComponent } from './components/listados/gestion-de-solicitudes/gestion-de-solicitudes.component';
import { InicioFiltroComponent } from './components/listados/gestion-de-solicitudes/inicio-filtro/inicio-filtro.component';
import { InicioCardComponent } from './components/listados/gestion-de-solicitudes/inicio-card/inicio-card.component';
import { DefinirBoletosComponent } from './components/listados/gestion-de-solicitudes/definir-boletos/definir-boletos.component';
import { SolicitudesTotalComponent } from './components/listados/gestion-de-solicitudes/solicitudes-total/solicitudes-total.component';
import { PagarConCanjeDisponibleComponent } from './components/listados/gestion-de-solicitudes/pagar-con-canje-disponible/pagar-con-canje-disponible.component';
import { DefinicionDeBoletosComponent } from './components/listados/gestion-de-solicitudes/definicion-de-boletos/definicion-de-boletos.component';
import { DefinicionInfoComponent } from './components/listados/billetera/billetera-pagar/definicion-de-boletos/definicion-info/definicion-info.component';
import { DefinicionBoletosComponent } from './components/listados/gestion-de-solicitudes/definicion-de-boletos/definicion-boletos/definicion-boletos.component';
import { DefinicionFiltroComponent } from './components/listados/billetera/billetera-pagar/definicion-de-boletos/definicion-filtro/definicion-filtro.component';
import { ResumenPagoComponent } from './components/listados/billetera/billetera-pagar/resumen/resumen-pago/resumen-pago.component';
import { ResumenPesosComponent } from './components/listados/billetera/billetera-pagar/resumen/resumen-pesos/resumen-pesos.component';
import { ResumenDolaresComponent } from './components/listados/billetera/billetera-pagar/resumen/resumen-dolares/resumen-dolares.component';
import { ResumenTipoPagoComponent } from './components/listados/billetera/billetera-pagar/resumen/resumen-tipo-pago/resumen-tipo-pago.component';
import { ResumenTotalPagoComponent } from './components/listados/billetera/billetera-pagar/resumen/resumen-total-pago/resumen-total-pago.component';
import { ResumenTotalPagoInfoComponent } from './components/listados/billetera/billetera-pagar/resumen/resumen-total-pago-info/resumen-total-pago-info.component';
import { ResumenComprobanteDialogComponent } from './components/listados/billetera/billetera-pagar/resumen/resumen-comprobante-dialog/resumen-comprobante-dialog.component';
import { ResumenComprobantePagosInfoComponent } from './components/listados/billetera/billetera-pagar/resumen/resumen-comprobante-pagos-info/resumen-comprobante-pagos-info.component';
import { ResumenInfoSumaComponent } from './components/listados/billetera/billetera-pagar/resumen/resumen-info-suma/resumen-info-suma.component';
import { ResumenInfoOperacionComponent } from './components/listados/billetera/billetera-pagar/resumen/resumen-info-operacion/resumen-info-operacion.component';
import { ResumenResumenComponent } from './components/listados/billetera/billetera-pagar/resumen/resumen-resumen/resumen-resumen.component';
import { TarjetaTabContainerPagarComponent } from './components/listados/billetera/tarjeta-tab-container-pagar/tarjeta-tab-container-pagar.component';
import { DefinicionDeBoletosAFijarComponent } from './components/listados/billetera/billetera-pagar/definicion-de-boletos/definicion-de-boletos-afijar/definicion-de-boletos-afijar.component';
import { DefinicionDeUnBoletoAFijarComponent } from './components/listados/billetera/billetera-pagar/definicion-de-boletos/definicion-de-un-boleto-afijar/definicion-de-un-boleto-afijar.component';
import { DefinicionDeBoletosAFijarTotalComponent } from './components/listados/billetera/billetera-pagar/definicion-de-boletos/definicion-de-boletos-afijar-total/definicion-de-boletos-afijar-total.component';
import { DefinicionDeBoletosAPesificarComponent } from './components/listados/billetera/billetera-pagar/definicion-de-boletos/definicion-de-boletos-apesificar/definicion-de-boletos-apesificar.component';
import { DefinicionDeUnBoletoAPesificarComponent } from './components/listados/billetera/billetera-pagar/definicion-de-boletos/definicion-de-un-boleto-apesificar/definicion-de-un-boleto-apesificar.component';
import { DefinicionDeBoletosAPesificarTotalComponent } from './components/listados/billetera/billetera-pagar/definicion-de-boletos/definicion-de-boletos-apesificar-total/definicion-de-boletos-apesificar-total.component';
import { ResumenPagoComprobanteAPagarComponent } from './components/listados/billetera/billetera-pagar/resumen/resumen-pago-comprobante-apagar/resumen-pago-comprobante-apagar.component';
import { ResumenPagoMedioCanjeComponent } from './components/listados/billetera/billetera-pagar/resumen/resumen-pago-medio-canje/resumen-pago-medio-canje.component';

registerLocaleData(localeEsAr, 'es-AR');

export function tokenGetter() {
  const usuario = JSON.parse(localStorage.getItem('currentUser'));
  return usuario != null ? usuario.token : '';
}

@NgModule({
  declarations: [
    AppComponent,
		LoginComponent,
		DashboardComponent,
		MainNavComponent,
		CtacteComponent,
		CtacteDetalleComponent,
		CtacteAplicadaComponent,
		CtacteAplicadaDetalleComponent,
		EntregasComponent,
		EntregasDetalleComponent,
		VentasComponent,
		VentasDetalleComponent,
		MercPendEntregarComponent,
		MercPendEntregarDetalleDesktopComponent,
		ComprobantesPendFacturarComponent,
		ComprobantesPendFacturarDetalleDesktopComponent,
		CtacteMasOperacionesComponent,
		CtacteDetalleMasOperacionesComponent,
		CtaCteAplicadaMasOperacionesComponent,
		CtaCteAplicadaDetalleMasOperacionesComponent,
		EntregasMasOperacionesComponent,
		VentasMasOperacionesComponent,
		MercPendEntregarHeaderItemDesktopComponent,
		MercPendEntregarItemDesktopComponent,
		ComprobantesPendFacturarListaDesktopComponent,
		MercPendEntregarListaDesktopComponent,
		PerfilesListadoComponent,
		PerfilesEdicionComponent,
		AccesoTercerosComponent,
		AccesoTercerosEdicionComponent,
		OtrosMovimientosComponent,
		OtrosMovimientosDetalleComponent,
		OtrosMovimientosMasOperacionesComponent,
		OtrosMovimientosDetalleMasOperacionesComponent,
		SelectorCuentasComponent,
		ComboCuentaComponent,
		InformacionDePerfilComponent,
		ArchivoDeComprobantesComponent,
		RecuperacionPasswordComponent,
		RestablecimientoPasswordComponent,
		ModalCambioPasswordComponent,
		SolicitudAltaComponent,
		BuzonComponent,
		AccesoBuzonComponent,
		NotificacionDetalleComponent,
		KilosAPipe,
		KilosTextoAPipe,
		InfoPerfilComponent,
		LinkMenuComponent,
		ToolBarGeneralComponent,
		AvatarDelPerfilComponent,
		CerealesFiltroComponent,
		ReporteFiltroDesktopComponent,
		ImagenEspeciePipe,
		EntregasListaDesktopComponent,
		EntregasListaMovilComponent,
		ToolBarParaModalComponent,
		VentasListaMovilComponent,
		VentasListaDesktopComponent,
		MonedaPipe,
		CuentaCorrienteComponent,
		CuentaCorrienteListaComponent,
		CtaCteFiltroComponent,
		ContratosComponent,
		ContratosListaMovilComponent,
		ContratosDetalleComponent,
		ContratosResumenItemMovilComponent,
		ContratoEntregasDetalleComponent,
		ContratoVentasDetalleComponent,
		SaldoCtaCteAplicadaGlobalComponent,
		FechaHoraComponent,
		ContratoIndicadorEntregasYVentasComponent,
		ContratoIndicadorEntregaComponent,
		ContratoIndicadorVentaComponent,
		ContratoIndicadorSwiperEntregaComponent,
		ContratoIndicadorSwiperVentasComponent,
		ContratoIndicadorEntregasRecientesComponent,
		ContratoIndicadorVentasRecientesComponent,
		PanelNotificacionesComponent,
		PanelNotificacionesItemComponent,
		CuentaCorrienteAplicadaListaComponent,
		CuentaCorrienteDetalleComponent,
		FiltroCosechaComponent,
		LoadingComponent,
		TercerosListaMovilComponent,
		InfoPerfilCambioPasswordComponent,
		InfoPerfilEdicionComponent,
		AvatarEditorComponent,
		ContratoIndicadorVentaPesificadasComponent,
		ContratoIndicadorSwiperVentasPesificadasComponent,
		ContratoIndicadorVentaLiquidadasComponent,
		ContratoIndicadorSwiperVentasLiquidadasComponent,
		CuentaCorrienteSaldosComponent,
		CuentaCorrienteAplicadaSaldoComponent,
		ComprobantesComponent,
		FiltroArchivosComprobantesComponent,
		PrecioQQAPipe,
		TenenciasImpositivasComponent,
		CuentaCorrienteAplicadaDetalleComponent,
		TenenciaImpositivaDetalleComponent,
		ReportesComponent,
		NetasAPipe,
		SaldoCtaCteAplicadaGlobalACobrarComponent,
		SaldoCtaCteAplicadaGlobalAPagarComponent,
		ContratosListaDesktopComponent,
		ContratosResumenItemDesktopComponent,
		ContratosResumenHeaderItemDesktopComponent,
		CerealesFiltroDesktopComponent,
		ContratoDetalleDesktopComponent,
		ContratoIndicadorGraficoPorcentualComponent,
		EntregasHeaderItemDesktopComponent,
		ComprobantesPendFacturarHeaderItemDesktopComponent,
		EntregasItemDesktopComponent,
		ComprobantesPendFacturarItemDesktopComponent,
		EntregasDetalleDesktopComponent,
		VentasHeaderItemDesktopComponent,
		VentasItemDesktopComponent,
		VentasDetalleDesktopComponent,
		CtaCteFiltroDesktopComponent,
		CuentaCorrienteListaDesktopComponent,
		CuentaCorrienteAplicadaListaDesktopComponent,
		CuentaCorrienteHeaderItemDesktopComponent,
		CuentaCorrienteItemDesktopComponent,
		CuentaCorrienteAplicadaHeaderItemDesktopComponent,
		CuentaCorrienteAplicadaItemDesktopComponent,
		CuentaCorrienteDetalleDesktopComponent,
		CuentaCorrienteAplicadaDetalleDesktopComponent,
		InformacionDePerfilDesktopComponent,
		InfoPerfilEdicionDesktopComponent,
		SelectorUnidadMedidaComponent,
		TercerosListaDesktopComponent,
		EditaTuPerfilDesktopComponent,
		AccesoTercerosEdicionDesktopComponent,
		LoginLayoutComponent,
		HomeLayoutComponent,
		ContratoIndicadorSwiperVentasPagosComponent,
		ContratoIndicadorVentaPagosComponent,
		ToolBarDescargasComponent,
		EntregasIndicadorGlobalComponent,
		VentasIndicadorGlobalComponent,
		EntregasItemMovilComponent,
		VentasItemMovilComponent,
		CuentaCorrienteItemMovilComponent,
		CuentaCorrienteAplicadaItemMovilComponent,
		TutorialModalComponent,
		NotificacionDetalleUrlComponent,
		SeleccionadosModalComponent,
		ReporteUsuariosComponent,
		ReporteUsuariosToolbarComponent,
		ReporteProductoresComponent,
		ReporteProductoresToolbarComponent,
		SaldoConDiferenciaDeCamioEIvaComponent,
		LongPressDirective,
		BilleteraComponent,
		BilleteraPagarComponent,
		BilleteraCobrarComponent,
		TarjetaTabContainerComponent,
		PagarCobrarContainerComponent,
		TablaOperacionesRecientesComponent,
		ListaOperacionesMovilComponent,
		TarjetaTabContainerWeb1Component,
		TarjetaTabContainerWebComponent,
		SaldoTcComponent,
		BilleteraAcobrarDesktopComponent,
		BilleteraApagarDesktopComponent,
		BilleteraAcobrarResumenItemComponent,
		BilleteraOperacionesItemComponent,
		PagarCobrarContainerDesktopComponent,
		BilleteraCobrarCardComponent,
		BilleteraCobrarListComponent,
		BilleteraCobrarCardCobroComponent,
		BilleteraCobrarCardTotalComponent,
		BilleteraCobrarCuentaComponent,
		BilleteraSaldoMovilComponent,
		BilleteraLiquidacionesDetalleComponent,
		BilleteraLiquidacionesDetalleUnaLiquidacionComponent,
		BilleteraCobrarIndicacionImportesComponent,
		BilleteraCobrarResumenComponent,
		BilleteraCobrarResumenTotalComponent,
		CuentaBancariaSelectorComponent,
		PagarFiltroComponent,
		PagarInfoComponent,
		PagarListadoComponent,
		PagarComprobantesTotalComponent,
		PagarListadoConceptoAPagarComponent,
		BilleteraCardInfoComponent,
		TotalPagarPagosComponent,
		PagosOpcionesComponent,
		PagarCanjeTotalComponent,
		PagarCanjeInfoComponent,
		CardPagarStockComponent,
		PagoConCanjeComponent,
		PagoConCanjeDisponibleComponent,
		OnlyNumberDirective,
		PrecioTNAPipe,
		PreciosDeGranosComponent,
		GestionDeSolicitudesComponent,
		InicioFiltroComponent,
		InicioCardComponent,
		DefinirBoletosComponent,
		SolicitudesTotalComponent,
		PagarConCanjeDisponibleComponent,
		DefinicionDeBoletosComponent,
		DefinicionInfoComponent,
		DefinicionBoletosComponent,
		DefinicionFiltroComponent,
		ResumenPagoComponent,
		ResumenPesosComponent,
		ResumenDolaresComponent,
		ResumenTipoPagoComponent,
		ResumenTotalPagoComponent,
		ResumenTotalPagoInfoComponent,
		ResumenComprobanteDialogComponent,
		ResumenComprobantePagosInfoComponent,
		ResumenInfoSumaComponent,
		ResumenInfoOperacionComponent,
		ResumenResumenComponent,
		TarjetaTabContainerPagarComponent,
		DefinicionDeBoletosAFijarComponent,
		DefinicionDeUnBoletoAFijarComponent,
		DefinicionDeBoletosAFijarTotalComponent,
		DefinicionDeBoletosAPesificarComponent,
		DefinicionDeUnBoletoAPesificarComponent,
		DefinicionDeBoletosAPesificarTotalComponent,
		ResumenPagoComprobanteAPagarComponent,
		ResumenPagoMedioCanjeComponent
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		ShowHidePasswordModule,
		BrowserAnimationsModule,
		MaterialModule,
		AppRoutingModule,
		ReactiveFormsModule,
		LayoutModule,
		MatToolbarModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatInputModule,
		FlexLayoutModule,
		FormsModule,
		CommonModule,
		JwtModule.forRoot({
			config: {
				throwNoTokenError: false,
				tokenGetter: tokenGetter,
				whitelistedDomains: []
			}
		}),
		EllipsisModule,
		DeviceDetectorModule.forRoot(),
		InfiniteScrollModule,
		NgxGaugeModule,
		SwiperModule,
		NgxSpinnerModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: LOCALE_ID, useValue: 'es-AR' },
		{ provide: DateAdapter, useClass: AppDateAdapter },
		{ provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
		DecimalPipe,
		{ provide: MatPaginatorIntl, useClass: CustomPaginatorEspanol },
		JwtHelperService,
		{ provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG },
		DatePipe
	],
	entryComponents: [
		CtacteDetalleComponent,
		CtacteAplicadaDetalleComponent,
		EntregasDetalleComponent,
		VentasDetalleComponent,
		MercPendEntregarDetalleDesktopComponent,
		ComprobantesPendFacturarDetalleDesktopComponent,
		CtacteMasOperacionesComponent,
		CtacteDetalleMasOperacionesComponent,
		CtaCteAplicadaMasOperacionesComponent,
		CtaCteAplicadaDetalleMasOperacionesComponent,
		EntregasMasOperacionesComponent,
		VentasMasOperacionesComponent,
		MercPendEntregarHeaderItemDesktopComponent,
		MercPendEntregarItemDesktopComponent,
		ComprobantesPendFacturarListaDesktopComponent,
		MercPendEntregarListaDesktopComponent,
		PerfilesEdicionComponent,
		AccesoTercerosEdicionComponent,
		OtrosMovimientosDetalleComponent,
		OtrosMovimientosMasOperacionesComponent,
		OtrosMovimientosDetalleMasOperacionesComponent,
		ModalCambioPasswordComponent,
		NotificacionDetalleComponent,
		ContratosDetalleComponent,
		ContratoEntregasDetalleComponent,
		ContratoVentasDetalleComponent,
		CuentaCorrienteDetalleComponent,
		FiltroCosechaComponent,
		AccesoTercerosComponent,
		InfoPerfilCambioPasswordComponent,
		InfoPerfilEdicionComponent,
		CuentaCorrienteAplicadaDetalleComponent,
		TutorialModalComponent,
		NotificacionDetalleUrlComponent,
		SeleccionadosModalComponent,
		BilleteraLiquidacionesDetalleComponent,
		BilleteraCobrarCuentaComponent,
		BilleteraCardInfoComponent,
		PreciosDeGranosComponent,
		ResumenComprobanteDialogComponent,
		DefinicionDeBoletosAFijarComponent,
		DefinicionDeBoletosAPesificarComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
