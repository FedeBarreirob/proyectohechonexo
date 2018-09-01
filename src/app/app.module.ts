import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// locale
import { registerLocaleData } from '@angular/common';
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
    CtacteAplicadaDetalleComponent
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
    { provide: LOCALE_ID, useValue: 'es-AR' }
  ],
  entryComponents: [CtacteDetalleComponent, CtacteAplicadaDetalleComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
