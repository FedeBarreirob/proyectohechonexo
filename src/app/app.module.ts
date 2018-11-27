import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// locale
import { registerLocaleData, DecimalPipe } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';

// Animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Material
import { MaterialModule } from './material';

// Interceptadores
import { ErrorAuthInterceptor } from './interceptors/security/error.auth.interceptor'
import { JwtInterceptor } from './interceptors/security/jwt.interceptor'

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { CtacteComponent } from './ctacte/ctacte.component';
import { CtacteDetalleComponent } from './ctacte.detalle/ctacte.detalle.component';
import { CtacteAplicadaComponent } from './ctacte-aplicada/ctacte-aplicada.component';
import { CtacteAplicadaDetalleComponent } from './ctacte-aplicada-detalle/ctacte-aplicada-detalle.component';
import { EntregasComponent } from './entregas/entregas.component';
import { EntregasDetalleComponent } from './entregas-detalle/entregas-detalle.component';
import { VentasComponent } from './ventas/ventas.component';
import { VentasDetalleComponent } from './ventas-detalle/ventas-detalle.component';
import { MercPendEntregarComponent } from './merc-pend-entregar/merc-pend-entregar.component';
import { MercPendEntregarDetalleComponent } from './merc-pend-entregar-detalle/merc-pend-entregar-detalle.component';
import { ComprobantesPendFacturarComponent } from './comprobantes-pend-facturar/comprobantes-pend-facturar.component';
import { ComprobantesPendFacturarDetalleComponent } from './comprobantes-pend-facturar-detalle/comprobantes-pend-facturar-detalle.component';
import { CtacteMasOperacionesComponent } from './ctacte-mas-operaciones/ctacte-mas-operaciones.component';
import { CtacteDetalleMasOperacionesComponent } from './ctacte-detalle-mas-operaciones/ctacte-detalle-mas-operaciones.component';
import { CtaCteAplicadaMasOperacionesComponent } from './cta-cte-aplicada-mas-operaciones/cta-cte-aplicada-mas-operaciones.component';
import { CtaCteAplicadaDetalleMasOperacionesComponent } from './cta-cte-aplicada-detalle-mas-operaciones/cta-cte-aplicada-detalle-mas-operaciones.component';
import { EntregasMasOperacionesComponent } from './entregas-mas-operaciones/entregas-mas-operaciones.component';
import { EntregasDetalleMasOperacionesComponent } from './entregas-detalle-mas-operaciones/entregas-detalle-mas-operaciones.component';
import { VentasMasOperacionesComponent } from './ventas-mas-operaciones/ventas-mas-operaciones.component';
import { VentasDetalleMasOperacionesComponent } from './ventas-detalle-mas-operaciones/ventas-detalle-mas-operaciones.component';
import { MercPendEntregarMasOperacionesComponent } from './merc-pend-entregar-mas-operaciones/merc-pend-entregar-mas-operaciones.component';
import { MercPendEntregarDetalleMasOperacionesComponent } from './merc-pend-entregar-detalle-mas-operaciones/merc-pend-entregar-detalle-mas-operaciones.component';
import { ComprobantesPendFacturarMasOperacionesComponent } from './comprobantes-pend-facturar-mas-operaciones/comprobantes-pend-facturar-mas-operaciones.component';
import { ComprobantesPendFacturarDetalleMasOperacionesComponent } from './comprobantes-pend-facturar-detalle-mas-operaciones/comprobantes-pend-facturar-detalle-mas-operaciones.component';
import { PerfilesListadoComponent } from './perfiles-listado/perfiles-listado.component';
import { PerfilesEdicionComponent } from './perfiles-edicion/perfiles-edicion.component';

registerLocaleData(localeEsAr, 'es-AR');

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
    PerfilesEdicionComponent
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
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es-AR' },
    DecimalPipe
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
    PerfilesEdicionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
