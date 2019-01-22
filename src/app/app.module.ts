import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

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
import { EntregasDetalleMasOperacionesComponent } from './components/listados/entregas/entregas-detalle-mas-operaciones/entregas-detalle-mas-operaciones.component';
import { VentasMasOperacionesComponent } from './components/listados/ventas/ventas-mas-operaciones/ventas-mas-operaciones.component';
import { VentasDetalleMasOperacionesComponent } from './components/listados/ventas/ventas-detalle-mas-operaciones/ventas-detalle-mas-operaciones.component';
import { MercPendEntregarMasOperacionesComponent } from './components/listados/merc-pend-entregar/merc-pend-entregar-mas-operaciones/merc-pend-entregar-mas-operaciones.component';
import { MercPendEntregarDetalleMasOperacionesComponent } from './components/listados/merc-pend-entregar/merc-pend-entregar-detalle-mas-operaciones/merc-pend-entregar-detalle-mas-operaciones.component';
import { ComprobantesPendFacturarMasOperacionesComponent } from './components/listados/comprobantes-pend-facturar/comprobantes-pend-facturar-mas-operaciones/comprobantes-pend-facturar-mas-operaciones.component';
import { ComprobantesPendFacturarDetalleMasOperacionesComponent } from './components/listados/comprobantes-pend-facturar/comprobantes-pend-facturar-detalle-mas-operaciones/comprobantes-pend-facturar-detalle-mas-operaciones.component';
import { PerfilesListadoComponent } from './components/usuarios-y-perfiles/perfiles/perfiles-listado/perfiles-listado.component';
import { PerfilesEdicionComponent } from './components/usuarios-y-perfiles/perfiles/perfiles-edicion/perfiles-edicion.component';
import { PerfilOperacionesComponent } from './components/usuarios-y-perfiles/perfiles/perfil-operaciones/perfil-operaciones.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AccesoTercerosComponent } from './components/usuarios-y-perfiles/terceros/acceso-terceros/acceso-terceros.component';
import { AccesoTercerosEdicionComponent } from './components/usuarios-y-perfiles/terceros/acceso-terceros-edicion/acceso-terceros-edicion.component';
import { AccesoTercerosOperacionesComponent } from './components/usuarios-y-perfiles/terceros/acceso-terceros-operaciones/acceso-terceros-operaciones.component';
import { OtrosMovimientosComponent } from './components/listados/otros-movimientos/otros-movimientos/otros-movimientos.component';
import { OtrosMovimientosDetalleComponent } from './components/listados/otros-movimientos/otros-movimientos-detalle/otros-movimientos-detalle.component';
import { OtrosMovimientosMasOperacionesComponent } from './components/listados/otros-movimientos/otros-movimientos-mas-operaciones/otros-movimientos-mas-operaciones.component';
import { OtrosMovimientosDetalleMasOperacionesComponent } from './components/listados/otros-movimientos/otros-movimientos-detalle-mas-operaciones/otros-movimientos-detalle-mas-operaciones.component';

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
		EntregasDetalleMasOperacionesComponent,
		VentasMasOperacionesComponent,
		VentasDetalleMasOperacionesComponent,
		MercPendEntregarMasOperacionesComponent,
		MercPendEntregarDetalleMasOperacionesComponent,
		ComprobantesPendFacturarMasOperacionesComponent,
		ComprobantesPendFacturarDetalleMasOperacionesComponent,
		PerfilesListadoComponent,
		PerfilesEdicionComponent,
		PerfilOperacionesComponent,
		AccesoTercerosComponent,
		AccesoTercerosEdicionComponent,
		AccesoTercerosOperacionesComponent,
		OtrosMovimientosComponent,
		OtrosMovimientosDetalleComponent,
		OtrosMovimientosMasOperacionesComponent,
		OtrosMovimientosDetalleMasOperacionesComponent
	],
	imports: [
		HttpClientModule,
		BrowserModule,
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
		})
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
		EntregasDetalleMasOperacionesComponent,
		VentasMasOperacionesComponent,
		VentasDetalleMasOperacionesComponent,
		MercPendEntregarMasOperacionesComponent,
		MercPendEntregarDetalleMasOperacionesComponent,
		ComprobantesPendFacturarMasOperacionesComponent,
		ComprobantesPendFacturarDetalleMasOperacionesComponent,
		PerfilesEdicionComponent,
		PerfilOperacionesComponent,
		AccesoTercerosEdicionComponent,
		AccesoTercerosOperacionesComponent,
		OtrosMovimientosDetalleComponent,
		OtrosMovimientosMasOperacionesComponent,
		OtrosMovimientosDetalleMasOperacionesComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
