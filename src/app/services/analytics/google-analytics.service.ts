import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }

  /**
   * Initialize Google Analytics
   */
  init() {
    if (environment.trackear == true && environment.inPhonegap == true) {

      if (window && window.ga) {
        window.ga.startTrackerWithId(environment.googleAnalyticsID);
      }

    }
  }

  /**
   * Tracking screen
   * @param screenName 
   * @param url Relative url
   */
  trackView(screenName: string, url: string) {
    if (environment.trackear == true && environment.inPhonegap == true) {

      if (window && window.ga) {
        window.ga.trackView(screenName, url);
      }

    }
  }
}
