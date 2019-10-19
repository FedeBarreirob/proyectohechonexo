import { Injectable } from '@angular/core';
import { AuthenticationService } from '../security/authentication.service';
import { PerfilBasico } from '../../interfaces/perfiles/perfil-basico';
import { environment } from '../../../environments/environment';

//let OneSignal;

declare var window: any;

@Injectable({
	providedIn: 'root'
})
export class OneSignalService {

	constructor(private authenticationService: AuthenticationService) { }

	/**
	* Initialize OneSignal
	*/
	init() {
		if (environment.inPhonegap == true) {
			// Enable to debug issues.
			//window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

			var notificationOpenedCallback = function (jsonData) {
				if (jsonData.notification.payload.additionalData.url) {
					window.open(jsonData.notification.payload.additionalData.url, "_self", 'location=yes');
				}
			};

			window.plugins.OneSignal
				.startInit(environment.oneSignalApiKey)
				.handleNotificationOpened(notificationOpenedCallback)
				.endInit();

			// get onesignal id
			let me = this;
			window.plugins.OneSignal.getIds(function (ids) {
				me.saveOneSignalIdInLS(ids.userId);
			});
		}
	}

	/**
	 * Saves onesignal id in ls 
	 * @param id 
	 */
	saveOneSignalIdInLS(id: string) {
		localStorage.setItem("onesignalid", id);

		let perfilLogueado: PerfilBasico = this.authenticationService.perfilUsuarioLogueado();
		if (perfilLogueado) {
			window.plugins.OneSignal.sendTag("perfil_id", perfilLogueado.informacionPersonal.id);
		}
	}

	public stop() {
		console.log("no implementado");
	}

	/*	oneSignalInit;
		oneSignalId: any;
		userSession: any;
	
		constructor(private authenticationService: AuthenticationService) { }
	
		// inicia el proceso de OneSignal
		public init() {
			this.oneSignalInit ? console.log('Already Initialized') : this.addScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js', () => {
				console.log('OneSignal Script Loaded');
				this.initOneSignal();
			})
		}
	
		public stop() {
			this.oneSignalInit = null;
		}
	
		addScript(fileSrc, callback) {
			const head = document.getElementsByTagName('head')[0];
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.onload = callback;
			script.src = fileSrc;
			head.appendChild(script);
		}
	
		initOneSignal() {
			let perfilLogueado: PerfilBasico = this.authenticationService.perfilUsuarioLogueado();
	
			if (perfilLogueado) {
				OneSignal = window['OneSignal'] || [];
				OneSignal.sendTag('perfil_id', perfilLogueado.informacionPersonal.id, (tagsSent) => {
					// Callback called when tags have finished sending
					console.log('OneSignal Tag Sent', tagsSent);
				});
				console.log('Init OneSignal');
				OneSignal.push(['init', {
					appId: '39901250-6212-4942-9d7a-413712e251fb',
					autoRegister: true,
					allowLocalhostAsSecureOrigin: true,
					notifyButton: {
						enable: false,
					},
				}]);
				console.log('OneSignal Initialized');
				this.checkIfSubscribed();
			} else {
				console.log('Perfil nulo');
			}
		}
	
		subscribe() {
			OneSignal.push(() => {
				console.log('Register For Push');
				OneSignal.push(['registerForPushNotifications'])
				OneSignal.on('subscriptionChange', (isSubscribed) => {
					console.log('The user\'s subscription state is now:', isSubscribed);
					this.listenForNotification();
					OneSignal.getUserId().then((userId) => {
						console.log('User ID is', userId);
						this.oneSignalId = userId;
						this.updateLocalUserProfile();
					});
				});
			});
		}
	
		listenForNotification() {
			console.log('Initalize Listener');
			OneSignal.on('notificationDisplay', (event) => {
				console.log('OneSignal notification displayed:', event);
				this.listenForNotification();
			});
		}
	
		getUserID() {
			OneSignal.getUserId().then((userId) => {
				console.log('User ID is', userId);
				this.oneSignalId = userId;
			});
		}
	
		checkIfSubscribed() {
			OneSignal.push(() => {
				OneSignal.isPushNotificationsEnabled((isEnabled) => {
					if (isEnabled) {
						console.log('Push notifications are enabled!');
						this.getUserID();
					} else {
						console.log('Push notifications are not enabled yet.');
						this.subscribe();
					}
				}, () => {
					console.log('Push permission not granted');
				});
			});
		}
	
		updateLocalUserProfile() {
			console.log(this.oneSignalId);
		}*/
}
