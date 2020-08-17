import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/security/authentication.service';
import { PerfilesService } from '../../services/perfiles/perfiles.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { NotificacionesService } from '../../services/notificaciones/notificaciones.service';
import { OneSignalService } from '../../services/push/one-signal.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from '../../../environments/environment';
import { MensajeBienvenidaDialogComponent } from '../tablero/mensaje-bienvenida-dialog/mensaje-bienvenida-dialog.component';
import { PerfilBasico } from '../../interfaces/perfiles/perfil-basico';
import { FileStorageService } from '../../services/file-storage/file-storage.service';
import { RoleEnum } from '../../enums/role-enum.enum';

declare var require: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	version: string = require('../../../../package.json').version;

	frmLogin: FormGroup;
	logueando: boolean = false;
	returnUrl: string;
	hidePassword = true;
	cargando$: Subject<boolean> = new Subject<boolean>();
	esCelular: boolean;
	inPhonegap: boolean = environment.inPhonegap;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authenticationService: AuthenticationService,
		private perfilService: PerfilesService,
		private snackBar: MatSnackBar,
		private notificacionService: NotificacionesService,
		private oneSignalService: OneSignalService,
		private deviceService: DeviceDetectorService,
		private dialog: MatDialog,
		private fileStorageService: FileStorageService
	) { }

	ngOnInit() {
		this.esCelular = this.deviceService.isMobile();
		this.inicializarFormulario();

		// reset login status
		this.authenticationService.logout();
		this.oneSignalService.stop();

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	/**
	 * Inicializa el formulario cargando datos recordados de ingreso si corresponde
	 */
	inicializarFormulario() {
		let credencialesRecordadas = this.authenticationService.credencialesRecordadas();

		if (credencialesRecordadas != null) {
			this.frmLogin = this.formBuilder.group({
				username: [credencialesRecordadas.username],
				password: [credencialesRecordadas.password],
				recuerdame: [true]
			});
		} else {
			this.frmLogin = this.formBuilder.group({
				username: [''],
				password: [''],
				recuerdame: [false]
			});
		}
	}

	login() {
		if (!this.logueando) {
			this.logueando = true;
			this.cargando$.next(true);

			const frm = this.frmLogin.value;
			this.authenticationService.login(frm.username, frm.password).subscribe(
				respuesta => {
					if (respuesta && respuesta.exito == true) {
						localStorage.setItem('homeTutorial', JSON.stringify(false));
						localStorage.setItem('contratosTutorial1-2', JSON.stringify(false));
						localStorage.setItem('contratosTutorial2-2', JSON.stringify(false));
						localStorage.setItem('entregasTutorial', JSON.stringify(false));
						localStorage.setItem('ventasTutorial', JSON.stringify(false));
						localStorage.setItem('cuentasTutorial', JSON.stringify(false));
						localStorage.setItem('comprobantesTutorial', JSON.stringify(false));
						localStorage.setItem('reportesTutorial', JSON.stringify(false));
						localStorage.setItem('perfilTutorial', JSON.stringify(false));
						localStorage.setItem('welcomeTutorial1-2', JSON.stringify(false));
						localStorage.setItem('welcomeTutorial2-2', JSON.stringify(false));
						this.authenticationService.guardarTokenUsuarioLogueado(frm.username, respuesta.token);

						if (frm.recuerdame == true) {
							this.authenticationService.guardarCredencialesParaIngresoAutomatico(frm.username, frm.password);
						} else {
							this.authenticationService.noRecordarCredenciales();
						}

						this.cargarPerfilLogueado().subscribe(cargoPerfil => {
							if (cargoPerfil == true) {
								this.notificacionService.huboCambiosEnEstado();
								this.authenticationService.loginCompleto();
								this.oneSignalService.init();
								this.router.navigate([this.returnUrl]);
								this.mostrarCuadroDeBienvenida();
							}
						});
					} else {
						this.cargando$.next(false);
						this.logueando = false;
						this.openSnackBar((respuesta.mensaje) ? respuesta.mensaje : 'Acceso denegado', "Login");
					}
				},
				error => {
					this.cargando$.next(false);
					this.logueando = false;
					this.openSnackBar(error, "Login");
				});
		} else {
			this.openSnackBar("Existe un proceso de login ejecutándose.", "Login");
		}
	}

	private mostrarCuadroDeBienvenida() {
		if (this.fileStorageService.esDocLegajoCargado.getValue() == false) {
			this.dialog.open(MensajeBienvenidaDialogComponent, {
				maxWidth: '100vw',
				width: '312px',
				maxHeight: '100vh',
				height: '331px'
			});
		}
	}

	// funcion encargada de cargar el perfil
	private cargarPerfilLogueado(): Observable<boolean> {
		return new Observable<boolean>(observer => {
			this.perfilService.perfilLogueado().subscribe(respuesta => {

				if (respuesta != null && respuesta.exito == true) {
					localStorage.setItem('currentUserPerfil', JSON.stringify(respuesta.datos));
					this.cargarEstadoDecargaDelLegajo(respuesta.datos);
					observer.next(true);
				} else {
					console.log(respuesta);
					observer.next(false);
				}
			}, () => {
				this.openSnackBar("Error al intentar obtener los datos del perfil", "Login");
				observer.next(false);
			});

		});
	}

	// abre una notificacion
	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

	/**
	 * Notifica el estado de carga de la documentación del legajo
	 * @param perfil 
	 */
	cargarEstadoDecargaDelLegajo(perfil: PerfilBasico) {
		try {
			if (perfil && perfil.rol.id == RoleEnum.PRODUCTOR) {

				if (perfil.indicadorCargaLegajo.totalDocumentacionACompletar == perfil.indicadorCargaLegajo.cantDocumentacionCompletada) {
					this.fileStorageService.esDocLegajoCargado.next(true);
				} else {
					this.fileStorageService.esDocLegajoCargado.next(false);
				}

			}
		} catch (e) {
			console.log(e);
		}
	}
}
