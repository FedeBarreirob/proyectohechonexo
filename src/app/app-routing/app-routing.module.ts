import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// guarda
import { AuthGuardGuard } from '../security/auth-guard.guard';

// componentes
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { CtacteComponent } from '../ctacte/ctacte.component';
import { CtacteAplicadaComponent } from '../ctacte-aplicada/ctacte-aplicada.component';
import { EntregasComponent } from '../entregas/entregas.component';
import { VentasComponent } from '../ventas/ventas.component'
import { MercPendEntregarComponent } from '../merc-pend-entregar/merc-pend-entregar.component'
import { ComprobantesPendFacturarComponent } from '../comprobantes-pend-facturar/comprobantes-pend-facturar.component'
import { PerfilesListadoComponent } from '../perfiles-listado/perfiles-listado.component'
import { AccesoTercerosComponent } from '../acceso-terceros/acceso-terceros.component';
import { OtrosMovimientosComponent } from '../otros-movimientos/otros-movimientos.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardGuard],
    data: {
      rolAdmin: false
    }
  },
  {
    path: 'ctacte',
    component: CtacteComponent,
    canActivate: [AuthGuardGuard],
    data: {
      rolAdmin: false
    }
  },
  {
    path: 'ctacte-aplicada',
    component: CtacteAplicadaComponent,
    canActivate: [AuthGuardGuard],
    data: {
      rolAdmin: false
    }
  },
  {
    path: 'entregas',
    component: EntregasComponent,
    canActivate: [AuthGuardGuard],
    data: {
      rolAdmin: false
    }
  },
  {
    path: 'ventas',
    component: VentasComponent,
    canActivate: [AuthGuardGuard],
    data: {
      rolAdmin: false
    }
  },
  {
    path: 'mercaderia-pendiente-entregar',
    component: MercPendEntregarComponent,
    canActivate: [AuthGuardGuard],
    data: {
      rolAdmin: false
    }
  },
  {
    path: 'comprobantes-pendientes-facturar',
    component: ComprobantesPendFacturarComponent,
    canActivate: [AuthGuardGuard],
    data: {
      rolAdmin: false
    }
  },
  {
    path: 'otros-movimientos',
    component: OtrosMovimientosComponent,
    canActivate: [AuthGuardGuard],
    data: {
      rolAdmin: false
    }
  },
  {
    path: 'perfiles',
    component: PerfilesListadoComponent,
    canActivate: [AuthGuardGuard],
    data: {
      rolAdmin: true
    }
  },
  {
    path: 'acceso-terceros',
    component: AccesoTercerosComponent,
    canActivate: [AuthGuardGuard],
    data: {
      rolAdmin: false
    }
  },
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
  ]
})
export class AppRoutingModule { }
