import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechasUtilService {

  constructor() { }

  /**
   * Convierte una fecha en formayo string dd/MM/yyyy a date
   * @param fechaES 
   */
  fechaEsADate(fechaES: string): Date {
    try {
      let fechaPartes: Array<any> = fechaES.split("/");
      let fechaEN = new Date(Number.parseInt(fechaPartes[2]), Number.parseInt(fechaPartes[1]) - 1, Number.parseInt(fechaPartes[0]));

      return new Date(fechaEN);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
