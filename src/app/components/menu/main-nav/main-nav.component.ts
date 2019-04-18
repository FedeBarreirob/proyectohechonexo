import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/security/authentication.service';

@Component({
	selector: 'app-main-nav',
	templateUrl: './main-nav.component.html',
	styleUrls: ['./main-nav.component.css']
})

export class MainNavComponent {

	// links que aparecen en el sidebar
	public links: Array<any>;

	constructor(
		private breakpointObserver: BreakpointObserver,
		public authService: AuthenticationService) {

		this.authService.huboLoginCompleto$.subscribe(
			() => this.cargarLinks()
		);
	}

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches)
		);

	get isPantallaPequena(): boolean {
		return this.breakpointObserver.isMatched('(max-width: 599px)');
	}

	cargarLinks() {
		this.links = [
			{
				nombre: "Inicio",
				rutaLink: "/dashboard",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true
			},
			{
				nombre: "Entregas",
				rutaLink: "/entregas",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true
			},
			{
				nombre: "Ventas",
				rutaLink: "/ventas",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true
			},
			{
				nombre: "Otros movimientos",
				rutaLink: "/otros-movimientos",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true
			},
			{
				nombre: "Cuenta Corriente",
				rutaLink: "/ctacte",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true
			},
			{
				nombre: "Cta Cte Aplicada",
				rutaLink: "/ctacte-aplicada",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true
			},
			{
				nombre: "Merc. Pend. Entregar",
				rutaLink: "/mercaderia-pendiente-entregar",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true
			},
			{
				nombre: "Comprob. Pend. Facturar",
				rutaLink: "/comprobantes-pendientes-facturar",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true
			},
			{
				nombre: "Administrador de cuentas",
				rutaLink: "/administrador-de-cuentas",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: this.authService.esAdmin || this.authService.esRol('SUB_ADMINISTRADOR') || this.authService.esRol('COMERCIAL')
			},
			{
				nombre: "Accesos a terceros",
				rutaLink: "/acceso-terceros",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: this.authService.esAdmin || this.authService.esRol('PRODUCTOR')
			},
			{
				nombre: "Información del perfil",
				rutaLink: "/informacion-de-perfil",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true
			},
			{
				nombre: "Archivo de comprobantes",
				rutaLink: "/archivo-de-comprobantes",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true
			},
			{
				nombre: "Cerrar Sersión",
				rutaLink: "/login",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true
			}
		];
	}
}


