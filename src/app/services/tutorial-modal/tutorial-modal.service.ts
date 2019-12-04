import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TutorialModal } from '../../interfaces/tutorial-modal/tutorial-modal';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TutorialModalService {

  private urlTutorialModalMarcarVisto = `${environment.hostSeguridad}/tutorialesModales/marcarVisto`;

  constructor(
    private http: HttpClient
  ) { }

  // funcion que marca como visto un modal de tutorial
  marcarVisto(body: TutorialModal) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.urlTutorialModalMarcarVisto, JSON.stringify(body), httpOptions);
  }

}
