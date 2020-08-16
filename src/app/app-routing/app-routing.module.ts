import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// guarda
import { AuthGuardGuard } from '../security/auth-guard.guard';

// componentes
import { DashboardComponent } from '../components/tablero/dashboard/dashboard.component';
import { LoginComponent } from '../components/login/login.component';
import { EntregasComponent } from '../components/listados/entregas/entregas/entregas.component';
import { VentasComponent } from '../components/listados/ventas/ventas/ventas.component'
import { MercPendEntregarComponent } from '../components/listados/merc-pend-entregar/merc-pend-entregar/merc-pend-entregar.component'
import { ComprobantesPendFacturarComponent } from '../components/listados/comprobantes-pend-facturar/comprobantes-pend-facturar/comprobantes-pend-facturar.component'
import { PerfilesListadoComponent } from '../components/usuarios-y-perfiles/perfiles/perfiles-listado/perfiles-listado.component'
import { OtrosMovimientosComponent } from '../components/listados/otros-movimientos/otros-movimientos/otros-movimientos.component';
import { InformacionDePerfilComponent } from '../components/usuarios-y-perfiles/informacion-de-perfil/informacion-de-perfil.component';
import { RecuperacionPasswordComponent } from '../components/usuarios-y-perfiles/recuperacion-password/recuperacion-password.component';
import { RestablecimientoPasswordComponent } from '../components/usuarios-y-perfiles/restablecimiento-password/restablecimiento-password.component';
import { SolicitudAltaComponent } from '../components/usuarios-y-perfiles/solicitud-alta/solicitud-alta.component';
import { BuzonComponent } from '../components/notificaciones/buzon/buzon.component';
import { CuentaCorrienteComponent } from '../components/listados/cuenta-corriente/cuenta-corriente/cuenta-corriente.component';
import { ContratosComponent } from '../components/listados/contratos/contratos/contratos.component';
import { ComprobantesComponent } from '../components/listados/comprobantes/comprobantes/comprobantes.component';
import { ReportesComponent } from '../components/listados/reportes/reportes/reportes.component';
import { InformacionDePerfilDesktopComponent } from '../components/usuarios-y-perfiles/informacion-de-perfil-desktop/informacion-de-perfil-desktop.component';
import { LoginLayoutComponent } from '../components/layouts/login-layout/login-layout.component';
import { HomeLayoutComponent } from '../components/layouts/home-layout/home-layout.component';
import { NotificacionDetalleUrlComponent } from '../components/notificaciones/notificacion-detalle-url/notificacion-detalle-url.component';
import { BilleteraComponent } from '../components/listados/billetera/billetera/billetera.component';
import { BilleteraPagarComponent } from '../components/listados/billetera/billetera-pagar/billetera-pagar.component';
import { BilleteraCobrarComponent } from '../components/listados/billetera/billetera-cobrar/billetera-cobrar.component';
import { BilleteraCobrarCuentaComponent } from '../components/listados/billetera/billetera-cobrar/billetera-cobrar-cuenta/billetera-cobrar-cuenta.component';
import { GestionDeSolicitudesComponent } from '../components/listados/gestion-de-solicitudes/gestion-de-solicitudes.component';
import { DefinirBoletosComponent } from '../components/listados/gestion-de-solicitudes/definir-boletos/definir-boletos.component';
import { DefinicionDeBoletosComponent } from '../components/listados/gestion-de-solicitudes/definicion-de-boletos/definicion-de-boletos.component';
import { InicioRegistroComponent } from '../components/registro-usuario/inicio-registro/inicio-registro.component';
import { InicioRegistroDefinirCuentaComponent } from '../components/registro-usuario/inicio-registro-definir-cuenta/inicio-registro-definir-cuenta.component';
import { InicioRegistroConfirmacionMailComponent } from '../components/registro-usuario/inicio-registro-confirmacion-mail/inicio-registro-confirmacion-mail.component';
import { ValidarDocumentacionComponent } from '../components/validar-documentacion/validar-documentacion/validar-documentacion.component';
import { ValidarDocumentacionStepComponent } from '../components/validar-documentacion/validar-documentacion-step/validar-documentacion-step.component';
import { SituacionUsuarioComponent } from '../components/validar-documentacion/situacion-usuario/situacion-usuario.component';
import { SituacionUsuarioCompletaComponent } from '../components/validar-documentacion/situacion-usuario-completa/situacion-usuario-completa.component';
import { AperturaLegajoComponent } from '../components/listados/documentacion/apertura-legajo/apertura-legajo.component';

const routes: Routes = [
	{
		path: 'login', component: LoginLayoutComponent,
		children: [
			{ path: '', component: LoginComponent }
		]
	},
	{
		path: 'recuperacion-password', component: LoginLayoutComponent,
		children: [{
			path: '', component: RecuperacionPasswordComponent
		}]
	},
	{
		path: 'inicio-registro', component: LoginLayoutComponent,
		children: [{
			path: '', component: InicioRegistroComponent
		}]
	},
	{
		path: 'definir-cuenta', component: LoginLayoutComponent,
		children: [{
			path: '', component: InicioRegistroDefinirCuentaComponent
		}]
	},
	{
		path: 'confirmacion-mail/:mail', component: LoginLayoutComponent,
		children: [{
			path: '', component: InicioRegistroConfirmacionMailComponent
		}]
	},
	{
		path: 'validar-documentacion', component: LoginLayoutComponent,
		children: [{
			path: '', component: ValidarDocumentacionComponent
		}]
	},
	{
		path: 'validacion-step', component: LoginLayoutComponent,
		children: [{
			path: '', component: ValidarDocumentacionStepComponent
		}]
	},
	{
		path: 'situacion-usuario', component: LoginLayoutComponent,
		children: [{
			path: '', component: SituacionUsuarioComponent
		}]
	},
	{
		path: 'situacion-completada', component: LoginLayoutComponent,
		children: [{
			path: '', component: SituacionUsuarioCompletaComponent
		}]
	},
	{
		path: 'apertura-legajo', component: LoginLayoutComponent,
		children: [{
			path: '', component: AperturaLegajoComponent
		}]
	},
	{
		path: 'restablecer-password/:token', component: LoginLayoutComponent,
		children: [{
			path: '', component: RestablecimientoPasswordComponent
		}]
	},
	{
		path: '', component: HomeLayoutComponent,
		children: [
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
				component: CuentaCorrienteComponent,
				canActivate: [AuthGuardGuard],
				data: {
					rolAdmin: false
				}
			},
			{
				path: 'billetera',
				component: BilleteraComponent,
				canActivate: [AuthGuardGuard],
				data: {
					rolAdmin: false
				}
			},
			{
				path: 'pagar',
				component: BilleteraPagarComponent,
				canActivate: [AuthGuardGuard],
				data: {
					rolAdmin: false
				}
			},
			{
				path: 'pagar/:solicitudId',
				component: BilleteraPagarComponent,
				canActivate: [AuthGuardGuard],
				data: {
					rolAdmin: false
				}
			},
			{
				path: 'cobrar',
				component: BilleteraCobrarComponent,
				canActivate: [AuthGuardGuard],
				data: {
					rolAdmin: false
				}
			},
			/*{
				path: 'nuevacuenta',
				component: BilleteraCobrarCuentaComponent,
				canActivate: [AuthGuardGuard],
				data: {
					rolAdmin: false
				}
			},*/
			{
				path: 'entregas',
				component: EntregasComponent,
				canActivate: [AuthGuardGuard],
				data: {
					rolAdmin: false
				}
			},
			{
				path: 'notificacion/:id',
				component: NotificacionDetalleUrlComponent,
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
				path: 'gestion-de-solicitudes',
				component: GestionDeSolicitudesComponent,
				canActivate: [AuthGuardGuard],
				data: {
					rolAdmin: false
				}
			},
			{
				path: 'definir-boletos',
				component: DefinirBoletosComponent,
				canActivate: [AuthGuardGuard],
				data: {
					rolAdmin: false
				}
			},
			{
				path: 'definicion-de-boletos',
				component: DefinicionDeBoletosComponent,
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
				component: ComprobantesComponent,
				canActivate: [AuthGuardGuard],
				data: {
					rolAdmin: false
				}
			},
			{
				path: 'buzon',
				component: BuzonComponent,
				canActivate: [AuthGuardGuard],
				data: {
					rolAdmin: false
				}
			},
			{
				path: 'contratos',
				component: ContratosComponent,
				canActivate: [AuthGuardGuard],
				data: {
					rolAdmin: false
				}
			},
			{
				path: 'reportes',
				component: ReportesComponent,
				canActivate: [AuthGuardGuard],
				data: {
					rolAdmin: false
				}
			},
			{
				path: 'informacion-de-perfil-desktop',
				component: InformacionDePerfilDesktopComponent,
				canActivate: [AuthGuardGuard],
				data: {
					rolAdmin: false
				}
			},
			{
				path: 'solicitud-alta',
				component: SolicitudAltaComponent
			},
			{
				path: '', redirectTo: '/dashboard', pathMatch: 'full'
			},
			{
				path: '**', redirectTo: '/dashboard'
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { useHash: true })
	],
	exports: [
		RouterModule
	],
	declarations: [
	]
})
export class AppRoutingModule { }
