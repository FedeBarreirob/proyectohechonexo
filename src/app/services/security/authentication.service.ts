import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseAutentificacion } from '../../interfaces/security/response.autentificacion';
import { environment } from '../../../environments/environment'
import { PerfilBasico } from '../../interfaces/perfiles/perfil-basico';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { RoleEnum } from '../../enums/role-enum.enum';
import { Rol } from '../../interfaces/security/rol';
import { SolicitudRecuperacionPassword } from '../../interfaces/security/solicitud-recuperacion-password';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { NuevoPassword } from '../../interfaces/security/nuevo-password';
import { CambioPasswordUsuario } from '../../interfaces/security/cambio-password-usuario';
import { InfoSesion } from '../../interfaces/security/info-sesion';
import { share } from 'rxjs/operators';
import { UserAuth } from '../../models/security/user';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private urlSeguridadLogin = `${environment.hostSeguridad}/autentificacion/login`;
	private urlSolicitudRecupPassword = `${environment.hostSeguridad}/autentificacion/solicitudRecuperacionPassword`;
	private urlSolicitudRestablecimientoPassword = `${environment.hostSeguridad}/autentificacion/restablecerPassword`;
	private urlSolicitudRestablecimientoPasswordPorNombreUsuario = `${environment.hostSeguridad}/autentificacion/restablecerPasswordPorNombreUsuario`;
	private urlGuardarInformacionDeSesion = `${environment.hostSeguridad}/infoSesion`;
	private urlObtenerInformacionDeSesion = `${environment.hostSeguridad}/infoSesion`;
	private urlCambiarPassword = `${environment.hostSeguridad}/autentificacion/restablecerPasswordPorUsuario`;

	_perfilActivo$ = new Subject<PerfilBasico>();

	private _loginCompleto$ = new Subject<boolean>();

	constructor(
		private http: HttpClient,
		private jwtHelper: JwtHelperService
	) { }

	// funcion encargada de autenticar el usuario y obtener el token requerido para el consumo de servicios
	login(username: string, password: string): Observable<ResponseAutentificacion> {

		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};

		let credenciales = JSON.stringify({
			"username": username,
			"password": password
		});

		return this.http.post<ResponseAutentificacion>(this.urlSeguridadLogin,
			credenciales,
			httpOptions);
	}

	// cierra la sesion
	logout() {
		localStorage.removeItem('currentUser');
		localStorage.removeItem('currentUserPerfil');
		localStorage.removeItem('seleccionadoUserPerfil');
		this.logoutCompleto();
	}

	/**
	 * Renueva el token si corresponde, devuelve true si se renovó correctamente sino false
	 */
	async renovarToken(): Promise<boolean> {
		const response = await new Observable<boolean>(observable => {

			let credencialesRecordadas = this.credencialesRecordadas();
			if (credencialesRecordadas != null) {

				this.login(credencialesRecordadas.username, credencialesRecordadas.password)
					.pipe(share())
					.subscribe(
						respuesta => {
							if (respuesta.exito == true) {
								this.guardarTokenUsuarioLogueado(credencialesRecordadas.username, respuesta.token);
								observable.next(true);
							} else {
								observable.next(false);
							}
						},
						error => observable.next(false)
					);

			} else {
				observable.next(false);
			}

		}).toPromise();

		return response;
	}

	// funcion que indica si el usuario se encuentra logueado en el sistema
	// no se verifica validez del token asociado
	get esLogueado() {
		if (localStorage.getItem('currentUser')) {
			let usuario = JSON.parse(localStorage.getItem('currentUser'));
			return !this.jwtHelper.isTokenExpired(usuario.token);
		} else {
			return false;
		}
	}

	// funcion que devuelve el usuario logueado
	usuarioLogueado() {
		if (this.esLogueado) {
			return JSON.parse(localStorage.getItem('currentUser'));
		} else {
			return null;
		}
	}

	// funcion que devuelve el perfil del usuario logueado
	perfilUsuarioLogueado() {
		if (this.esLogueado) {
			return <PerfilBasico>JSON.parse(localStorage.getItem('currentUserPerfil'));
		} else {
			return null;
		}
	}

	// funcion que devuelve el perfil del usuario seleccionado
	perfilUsuarioSeleccionado() {
		if (localStorage.getItem('seleccionadoUserPerfil') !== null) {
			return JSON.parse(localStorage.getItem('seleccionadoUserPerfil'));
		} else {
			return this.perfilUsuarioLogueado();
		}
	}

	// funcion que devuelve el perfil seleccionado, si este es nulo, devuelve el perfil del usuario logueado
	get perfilActivo$(): Observable<PerfilBasico> {
		return this._perfilActivo$.asObservable();
	}

	// funcion que establece el perfil activo
	setPerfilActivo(perfil?: PerfilBasico) {
		localStorage.removeItem('seleccionadoUserPerfil');

		if (perfil != null) {
			localStorage.setItem('seleccionadoUserPerfil', JSON.stringify(perfil));
		}

		this._perfilActivo$.next(this.perfilUsuarioSeleccionado());
	}

	// funcion que indica si el usuario es admin
	get esAdmin() {
		let perfil = this.perfilUsuarioLogueado();
		if (perfil != null && perfil.rol != null) {
			return perfil.rol.admin;
		} else {
			return false;
		}
	}

	// funcion que devuelve el tipo de rol logueado
	esRol(rolDescripcion: string): boolean {
		try {
			let perfil = this.perfilUsuarioLogueado();
			if (perfil != null && perfil.rol != null) {
				return perfil.rol.id === RoleEnum[rolDescripcion];
			} else {
				return false;
			}
		} catch (e) {
			console.log(e);
			return false;
		}
	}

	// funcion encargada de verificar si un rol ingresado corresponde a una descripcion dada
	correspondeRol(rol: Rol, rolDescripcion: string): boolean {
		try {
			if (rol != null) {
				return rol.id === RoleEnum[rolDescripcion];
			} else {
				return false;
			}
		} catch (e) {
			console.log(e);
			return false;
		}
	}

	// funcion que determina si el usuario logueado es comercial o suadmin
	esSuadminOComercial(): boolean {
		return this.esRol('SUB_ADMINISTRADOR') || this.esRol('COMERCIAL');
	}

	// funcion que envia la solicitud para recuperar la contrasena
	solicitudRecuperacionPassword(solicitud: SolicitudRecuperacionPassword): Observable<ResponseServicio> {
		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};

		let solicitudJson = JSON.stringify(solicitud);

		return this.http.post<ResponseServicio>(
			this.urlSolicitudRecupPassword,
			solicitudJson,
			httpOptions);
	}

	// funcion encargada de restablecer la contrasena 
	restablecerPassword(nuevoPassword: NuevoPassword, token: string): Observable<ResponseServicio> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			})
		};

		let nuevoPasswordJson = JSON.stringify(nuevoPassword);

		return this.http.post<ResponseServicio>(
			this.urlSolicitudRestablecimientoPassword,
			nuevoPasswordJson,
			httpOptions);
	}

	// funcion encargada de restablecer la contrasena a traves del nombre de usuario
	restablecerPasswordPorNombreDeUsuario(cambioPassword: CambioPasswordUsuario): Observable<ResponseServicio> {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		let cambioPasswordJson = JSON.stringify(cambioPassword);

		return this.http.post<ResponseServicio>(
			this.urlSolicitudRestablecimientoPasswordPorNombreUsuario,
			cambioPasswordJson,
			httpOptions);
	}

	// funcion encargada de guardar la informacion de sesion
	guardarInformacionDeSesion(informacionSesion: InfoSesion): Observable<ResponseServicio> {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		let informacionSesionJson = JSON.stringify(informacionSesion);

		return this.http.post<ResponseServicio>(
			this.urlGuardarInformacionDeSesion,
			informacionSesionJson,
			httpOptions);
	}

	// funcion que retorna la informacion de sesion de un perfil dado
	informacionDeSesion(perfilId: number): Observable<ResponseServicio> {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		let urlConParametro = `${this.urlObtenerInformacionDeSesion}/${perfilId}`;
		return this.http.get<ResponseServicio>(urlConParametro, httpOptions).pipe(share());
	}

	// funcion encargada de notificar que hubo un login completo
	loginCompleto() {
		this._loginCompleto$.next(true);
	}

	// funcion encargada de notificar que hubo un logout completo
	logoutCompleto() {
		this._loginCompleto$.next(false);
	}

	// devuelve el observable indicando si hubo un login completo
	get huboLoginCompleto$(): Observable<boolean> {
		return this._loginCompleto$.asObservable();
	}

	/**
	 * Función que cambia el password del usuario logueado validando password actual
	 * @param nuevoPassword Nuevo pasword
	 */
	cambiarPassword(nuevoPassword: NuevoPassword): Observable<ResponseServicio> {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		let nuevoPasswordJson = JSON.stringify(nuevoPassword);

		return this.http.post<ResponseServicio>(
			this.urlCambiarPassword,
			nuevoPasswordJson,
			httpOptions);
	}

	/**
	 * Guarda las credenciales en cookies para ingresar automáticamente al sistem
	 * @param username 
	 * @param password 
	 */
	guardarCredencialesParaIngresoAutomatico(username: string, password: string) {
		let credenciales = {
			username: username,
			password: password
		};

		localStorage.setItem("credencialesRecordadas", JSON.stringify(credenciales));
	}

	/**
	 * Borra las cookies que almacenan las credenciales
	 */
	noRecordarCredenciales() {
		localStorage.removeItem("credencialesRecordadas");
	}

	/**
	 * Devuelve las credenciales recordadas
	 */
	credencialesRecordadas(): any {
		if (localStorage.getItem("credencialesRecordadas")) {
			return JSON.parse(localStorage.getItem("credencialesRecordadas"));
		} else {
			return null;
		}
	}

	/**
	 * Almacena en el cookie currentUser el usuario y token para uso con servicios
	 * @param username 
	 * @param token 
	 */
	guardarTokenUsuarioLogueado(username: string, token: string) {
		let user = new UserAuth();
		user.username = username;
		user.token = token;
		localStorage.setItem('currentUser', JSON.stringify(user));
	}
}
