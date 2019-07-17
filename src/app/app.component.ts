import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './services/security/authentication.service';

// declare ga as a function to set and sent the events
declare let ga: Function;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	title = 'Gaviglio Digital Clientes';

	constructor(
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer,
		private router: Router,
		private authService: AuthenticationService
	) {
		this.cargarIconos();
		this.trackUrl();
		this.trackUser();
	}

	/**
	 * Carga los iconos
	 */
	private cargarIconos() {
		this.matIconRegistry.addSvgIcon(
			"pdf",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/pdf.svg")
		);
	}

	/**
	 * Trackea las url para google analytics
	 */
	private trackUrl() {
		// subscribe to router events and send page views to Google Analytics
		this.router.events.subscribe(event => {

			if (event instanceof NavigationEnd) {
				ga('set', 'page', event.urlAfterRedirects);
				ga('send', 'pageview');
			}

		});
	}

	/**
	 * Trackea el usuario logueado para google analytics
	 */
	private trackUser() {
		this.authService.huboLoginCompleto$.subscribe(
			respuesta => {
				if (respuesta == true) {
					let usuario = this.authService.perfilUsuarioLogueado().credencial.username;
					ga('set', 'userId', usuario);
				}
			}
		);
	}
}
