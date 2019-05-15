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

// locale
import { registerLocaleData, DecimalPipe, CommonModule } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { CustomPaginatorEspanol } from './internacionalizacion/paginador-espanol';

// Animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Material
import { MaterialModule } from './material';

// Interceptadores
import { ErrorAuthInterceptor } from './interceptors/security/error.auth.interceptor'
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
import { MercPendEntregarDetalleComponent } from './components/listados/merc-pend-entregar/merc-pend-entregar-detalle/merc-pend-entregar-detalle.component';
import { ComprobantesPendFacturarComponent } from './components/listados/comprobantes-pend-facturar/comprobantes-pend-facturar/comprobantes-pend-facturar.component';
import { ComprobantesPendFacturarDetalleComponent } from './components/listados/comprobantes-pend-facturar/comprobantes-pend-facturar-detalle/comprobantes-pend-facturar-detalle.component';
import { CtacteMasOperacionesComponent } from './components/listados/cta-cte/ctacte-mas-operaciones/ctacte-mas-operaciones.component';
import { CtacteDetalleMasOperacionesComponent } from './components/listados/cta-cte/ctacte-detalle-mas-operaciones/ctacte-detalle-mas-operaciones.component';
import { CtaCteAplicadaMasOperacionesComponent } from './components/listados/cta-cte-aplicada/cta-cte-aplicada-mas-operaciones/cta-cte-aplicada-mas-operaciones.component';
import { CtaCteAplicadaDetalleMasOperacionesComponent } from './components/listados/cta-cte-aplicada/cta-cte-aplicada-detalle-mas-operaciones/cta-cte-aplicada-detalle-mas-operaciones.component';
import { EntregasMasOperacionesComponent } from './components/listados/entregas/entregas-mas-operaciones/entregas-mas-operaciones.component';
import { VentasMasOperacionesComponent } from './components/listados/ventas/ventas-mas-operaciones/ventas-mas-operaciones.component';
import { MercPendEntregarMasOperacionesComponent } from './components/listados/merc-pend-entregar/merc-pend-entregar-mas-operaciones/merc-pend-entregar-mas-operaciones.component';
import { MercPendEntregarDetalleMasOperacionesComponent } from './components/listados/merc-pend-entregar/merc-pend-entregar-detalle-mas-operaciones/merc-pend-entregar-detalle-mas-operaciones.component';
import { ComprobantesPendFacturarMasOperacionesComponent } from './components/listados/comprobantes-pend-facturar/comprobantes-pend-facturar-mas-operaciones/comprobantes-pend-facturar-mas-operaciones.component';
import { ComprobantesPendFacturarDetalleMasOperacionesComponent } from './components/listados/comprobantes-pend-facturar/comprobantes-pend-facturar-detalle-mas-operaciones/comprobantes-pend-facturar-detalle-mas-operaciones.component';
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
import { ArchivoDeComprobantesComponent } from './components/listados/archivo-de-comprobantes/archivo-de-comprobantes.component';
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

registerLocaleData(localeEsAr, 'es-AR');

export function tokenGetter() {
	let usuario = JSON.parse(localStorage.getItem('currentUser'));
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
		MercPendEntregarDetalleComponent,
		ComprobantesPendFacturarComponent,
		ComprobantesPendFacturarDetalleComponent,
		CtacteMasOperacionesComponent,
		CtacteDetalleMasOperacionesComponent,
		CtaCteAplicadaMasOperacionesComponent,
		CtaCteAplicadaDetalleMasOperacionesComponent,
		EntregasMasOperacionesComponent,
		VentasMasOperacionesComponent,
		MercPendEntregarMasOperacionesComponent,
		MercPendEntregarDetalleMasOperacionesComponent,
		ComprobantesPendFacturarMasOperacionesComponent,
		ComprobantesPendFacturarDetalleMasOperacionesComponent,
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
		SaldoCtaCteAplicadaGlobalComponent
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
		NgxGaugeModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorAuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: LOCALE_ID, useValue: 'es-AR' },
		DecimalPipe,
		{ provide: MatPaginatorIntl, useClass: CustomPaginatorEspanol },
		JwtHelperService
	],
	entryComponents: [
		CtacteDetalleComponent,
		CtacteAplicadaDetalleComponent,
		EntregasDetalleComponent,
		VentasDetalleComponent,
		MercPendEntregarDetalleComponent,
		ComprobantesPendFacturarDetalleComponent,
		CtacteMasOperacionesComponent,
		CtacteDetalleMasOperacionesComponent,
		CtaCteAplicadaMasOperacionesComponent,
		CtaCteAplicadaDetalleMasOperacionesComponent,
		EntregasMasOperacionesComponent,
		VentasMasOperacionesComponent,
		MercPendEntregarMasOperacionesComponent,
		MercPendEntregarDetalleMasOperacionesComponent,
		ComprobantesPendFacturarMasOperacionesComponent,
		ComprobantesPendFacturarDetalleMasOperacionesComponent,
		PerfilesEdicionComponent,
		AccesoTercerosEdicionComponent,
		OtrosMovimientosDetalleComponent,
		OtrosMovimientosMasOperacionesComponent,
		OtrosMovimientosDetalleMasOperacionesComponent,
		ModalCambioPasswordComponent,
		NotificacionDetalleComponent,
		ContratosDetalleComponent,
		ContratoEntregasDetalleComponent,
		ContratoVentasDetalleComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
