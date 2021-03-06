import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './services/security/authentication.service';
import { GoogleAnalyticsService } from './services/analytics/google-analytics.service';

// declare ga as a function to set and sent the events
declare let ga: Function;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	title = 'Gaviglio Digital Clientes';

	constructor(
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer,
		private router: Router,
		private authService: AuthenticationService,
		private googleAnalyticsService: GoogleAnalyticsService
	) {
		this.cargarIconos();
		this.trackUrl();
		this.trackUser();
	}

	ngOnInit(): void {
		this.googleAnalyticsService.init();
	}

	/**
	 * Carga los iconos
	 */
	private cargarIconos() {
		this.matIconRegistry.addSvgIcon(
			"pdf",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/pdf.svg")
		);

		this.matIconRegistry.addSvgIcon(
			"bell",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/toolbar/bell.svg")
		);

		this.matIconRegistry.addSvgIcon(
			"cedit",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/toolbar/edit.svg")
		);

		this.matIconRegistry.addSvgIcon(
			"cdelete",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/toolbar/delete.svg")
		);
	}

	/**
	 * Trackea las url para google analytics
	 */
	private trackUrl() {
		// subscribe to router events and send page views to Google Analytics
		this.router.events.subscribe(event => {

			if (event instanceof NavigationEnd) {

				this.googleAnalyticsService.trackView("route", event.urlAfterRedirects);

				if (ga) {
					ga('set', 'page', event.urlAfterRedirects);
					ga('send', 'pageview');
				}

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

					if (ga) {
						ga('set', 'userId', usuario);
					}
				}
			}
		);
	}
}
