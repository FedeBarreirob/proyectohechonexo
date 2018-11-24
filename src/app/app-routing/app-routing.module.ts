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

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'ctacte',
    component: CtacteComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'ctacte-aplicada',
    component: CtacteAplicadaComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'entregas',
    component: EntregasComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'ventas',
    component: VentasComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'mercaderia-pendiente-entregar',
    component: MercPendEntregarComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'comprobantes-pendientes-facturar',
    component: ComprobantesPendFacturarComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'perfiles',
    component: PerfilesListadoComponent,
    canActivate: [AuthGuardGuard]
  },
  { path: '**', redirectTo: 'dashboard' }
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
