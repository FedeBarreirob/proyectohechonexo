import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { ItemLinkMenu } from '../../../interfaces/menu/sidebar/item-link-menu';
import { MatSidenav } from '@angular/material';
import { SidebarService } from '../../../services/observers/sidebar/sidebar.service';

@Component({
	selector: 'app-main-nav',
	templateUrl: './main-nav.component.html',
	styleUrls: ['./main-nav.component.css']
})

export class MainNavComponent implements OnInit, OnDestroy {

	@ViewChild('drawer') public sidenav: MatSidenav;

	destroy$: Subject<any> = new Subject<any>();

	// links que aparecen en el sidebar
	public links: Array<ItemLinkMenu>;

	constructor(
		private breakpointObserver: BreakpointObserver,
		public authService: AuthenticationService,
		private sidebarService: SidebarService
	) {
	}

	ngOnInit(): void {
		this.authService.huboLoginCompleto$
			.pipe(takeUntil(this.destroy$))
			.subscribe(
				login => {
					if (login) {
						this.cargarLinks();
					} else {
						if (this.links) {
							this.links.splice(0, this.links.length);
						}
					}
				}
			);

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
					if (respuesta == true && this.authService.esLogueado) {
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
				permitido: true
			},
			{
				nombre: "Contratos",
				rutaLink: "/contratos",
				imagen: "assets/sidebar/contratos.png",
				imagenActiva: "assets/sidebar/contratos-hot.png",
				permitido: true
			},
			{
				nombre: "Entregas",
				rutaLink: "/entregas",
				imagen: "assets/sidebar/entrega.png",
				imagenActiva: "assets/sidebar/entrega-hot.png",
				permitido: true
			},
			{
				nombre: "Ventas",
				rutaLink: "/ventas",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true
			},
			/*{
				nombre: "Otros movimientos",
				rutaLink: "/otros-movimientos",
				imagen: "assets/sidebar/casa.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true
			},*/
			{
				nombre: "Cuenta Corriente",
				rutaLink: "/ctacte",
				imagen: "assets/sidebar/cta-cte.png",
				imagenActiva: "assets/sidebar/casa-hot.png",
				permitido: true
			},
			/*{
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
			},*/
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


