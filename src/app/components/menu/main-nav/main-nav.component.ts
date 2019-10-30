import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { ItemLinkMenu } from '../../../interfaces/menu/sidebar/item-link-menu';
import { MatSidenav } from '@angular/material';
import { SidebarService } from '../../../services/observers/sidebar/sidebar.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
	selector: 'app-main-nav',
	templateUrl: './main-nav.component.html',
	styleUrls: ['./main-nav.component.css']
})

export class MainNavComponent implements OnInit, OnDestroy {

	@ViewChild('drawer') public sidenav: MatSidenav;
	@ViewChild('menuNotificaciones') public sidenavNotificaciones: MatSidenav;

	destroy$: Subject<any> = new Subject<any>();
	esCelular: boolean;

	// links que aparecen en el sidebar
	public links: Array<ItemLinkMenu>;

	constructor(
		private breakpointObserver: BreakpointObserver,
		public authService: AuthenticationService,
		private sidebarService: SidebarService,
		private deviceService: DeviceDetectorService
	) {
	}

	ngOnInit(): void {
		this.esCelular = this.deviceService.isMobile();
		this.cargarLinks();

		// escuchar cambios en el toggle del sidebar
		this.sidebarService.toggle$
			.pipe(takeUntil(this.destroy$))
			.subscribe(
				() => this.sidenav.toggle()
			);

		// escuchar si debe mostrar el boton del sandwiche
		this.isHandset$
			.pipe(takeUntil(this.destroy$))
			.subscribe(
				respuesta => {
					if (respuesta == true) {
						this.sidebarService.notificarVisibilidadBotonSandwiche(true);
					} else {
						this.sidebarService.notificarVisibilidadBotonSandwiche(false);
					}
				}
			);

		// suscribir a la visualizacion del panel para sincronizar con el boton toggle de la barra principal
		this.isHandset$
			.pipe(takeUntil(this.destroy$))
			.subscribe(
				cerrado => {
					if (cerrado == true) {
						this.sidebarService.notificarVisibilidadBotonSandwiche(true);
					} else {
						this.sidebarService.notificarVisibilidadBotonSandwiche(false);
					}
				}
			);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.unsubscribe();
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
				permitido: true,
				ocultarDesktop: false
			},
			{
				nombre: "Contratos",
				rutaLink: "/contratos",
				imagen: "assets/sidebar/contratos.png",
				imagenActiva: "assets/sidebar/contratos-hot.png",
				permitido: true,
				ocultarDesktop: false
			},
			{
				nombre: "Entregas",
				rutaLink: "/entregas",
				imagen: "assets/sidebar/truck.png",
				imagenActiva: "assets/sidebar/truck-hot.png",
				permitido: true,
				ocultarDesktop: false
			},
			{
				nombre: "Ventas",
				rutaLink: "/ventas",
				imagen: "assets/sidebar/ventas.png",
				imagenActiva: "assets/sidebar/ventas-hot.png",
				permitido: true,
				ocultarDesktop: false
			},
			/*{
				nombre: "Otros movimientos",
				rutaLink: "/otros-movimientos",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true,
				ocultarDesktop: false
			},*/
			{
				nombre: "Cuenta",
				rutaLink: "/ctacte",
				imagen: "assets/sidebar/cta-cte.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true,
				ocultarDesktop: false
			},
			/*{
				nombre: "Merc. Pend. Entregar",
				rutaLink: "/mercaderia-pendiente-entregar",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true,
				ocultarDesktop: false
			},
			{
				nombre: "Comprob. Pend. Facturar",
				rutaLink: "/comprobantes-pendientes-facturar",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true,
				ocultarDesktop: false
			},*/
			{
				nombre: "Administrador de cuentas",
				rutaLink: "/administrador-de-cuentas",
				imagen: "assets/sidebar/perfil.png",
				imagenActiva: "assets/sidebar/perfil-hot.png",
				permitido: this.authService.esAdmin || this.authService.esRol('SUB_ADMINISTRADOR') || this.authService.esRol('COMERCIAL'),
				ocultarDesktop: false
			},
			/*{
				nombre: "Accesos a terceros",
				rutaLink: "/acceso-terceros",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: this.authService.esAdmin || this.authService.esRol('PRODUCTOR'),
				ocultarDesktop: false
			},*/
			{
				nombre: "Comprobantes",
				rutaLink: "/archivo-de-comprobantes",
				imagen: "assets/sidebar/folder.png",
				imagenActiva: "assets/sidebar/folder-hot.png",
				permitido: true,
				ocultarDesktop: false
			},
			{
				nombre: "Reportes",
				rutaLink: "/reportes",
				imagen: "assets/sidebar/chart.png",
				imagenActiva: "assets/sidebar/chart-hot.png",
				permitido: true,
				ocultarDesktop: false
			},
			{
				nombre: "Perfil",
				rutaLink: "/informacion-de-perfil",
				imagen: "assets/sidebar/perfil.png",
				imagenActiva: "assets/sidebar/perfil-hot.png",
				permitido: true,
				ocultarDesktop: true
			},
			{
				nombre: "Cerrar sesión",
				rutaLink: "/login",
				imagen: "assets/sidebar/close-session.png",
				imagenActiva: "assets/sidebar/close-session-hot.png",
				permitido: true,
				ocultarDesktop: false
			}
		];
	}

	/**
	 * Funcion encargada de mostrar u ocultar el sidebar que contiene las notificaciones
	 */
	mostrarOcultarNotificaciones() {
		if (this.sidenavNotificaciones) {
			this.sidenavNotificaciones.toggle();
		}
	}
}


