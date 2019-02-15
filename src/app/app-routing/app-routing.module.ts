import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// guarda
import { AuthGuardGuard } from '../security/auth-guard.guard';

// componentes
import { DashboardComponent } from '../components/tablero/dashboard/dashboard.component';
import { LoginComponent } from '../components/login/login.component';
import { CtacteComponent } from '../components/listados/cta-cte/ctacte/ctacte.component';
import { CtacteAplicadaComponent } from '../components/listados/cta-cte-aplicada/ctacte-aplicada/ctacte-aplicada.component';
import { EntregasComponent } from '../components/listados/entregas/entregas/entregas.component';
import { VentasComponent } from '../components/listados/ventas/ventas/ventas.component'
import { MercPendEntregarComponent } from '../components/listados/merc-pend-entregar/merc-pend-entregar/merc-pend-entregar.component'
import { ComprobantesPendFacturarComponent } from '../components/listados/comprobantes-pend-facturar/comprobantes-pend-facturar/comprobantes-pend-facturar.component'
import { PerfilesListadoComponent } from '../components/usuarios-y-perfiles/perfiles/perfiles-listado/perfiles-listado.component'
import { AccesoTercerosComponent } from '../components/usuarios-y-perfiles/terceros/acceso-terceros/acceso-terceros.component';
import { OtrosMovimientosComponent } from '../components/listados/otros-movimientos/otros-movimientos/otros-movimientos.component';
import { InformacionDePerfilComponent } from '../components/usuarios-y-perfiles/informacion-de-perfil/informacion-de-perfil.component';
import { ArchivoDeComprobantesComponent } from '../components/listados/archivo-de-comprobantes/archivo-de-comprobantes.component';
import { RecuperacionPasswordComponent } from '../components/usuarios-y-perfiles/recuperacion-password/recuperacion-password.component';
import { RestablecimientoPasswordComponent } from '../components/usuarios-y-perfiles/restablecimiento-password/restablecimiento-password.component';

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
		path: 'administrador-de-cuentas',
		component: PerfilesListadoComponent,
		canActivate: [AuthGuardGuard],
		data: {
			rolAdmin: false
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
		path: 'informacion-de-perfil',
		component: InformacionDePerfilComponent,
		canActivate: [AuthGuardGuard],
		data: {
			rolAdmin: false
		}
	},
	{
		path: 'archivo-de-comprobantes',
		component: ArchivoDeComprobantesComponent,
		canActivate: [AuthGuardGuard],
		data: {
			rolAdmin: false
		}
	},
	{
		path: 'recuperacion-password',
		component: RecuperacionPasswordComponent
	},
	{
		path: 'restablecer-password/:token',
		component: RestablecimientoPasswordComponent
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
