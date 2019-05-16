import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { FechaYHora } from '../../interfaces/reloj/fecha-yhora';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RelojService {

  clock: Observable<Date>;
  infofecha$ = new Subject<FechaYHora>();
  vr: FechaYHora;
  hours: number;

  constructor() {
    this.clock = timer(0, 1000).pipe(map(t => new Date()), shareReplay(1));
  }

  /**
   * Devuelve un observable con el valor de la hora actual
   */
  getInfoReloj(): Observable<FechaYHora> {
    this.clock.subscribe(t => {
      this.hours = t.getHours() % 12;
      this.hours = this.hours ? this.hours : 12;
      this.vr = {
        hora: (this.hours < 10) ? '0' + this.hours : this.hours.toString(),
        minutos: (t.getMinutes() < 10) ? '0' + t.getMinutes() : t.getMinutes().toString(),
        segundo: t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds().toString(),
        ampm: t.getHours() > 11 ? 'p.m.' : 'a.m.',
        dia: t.toLocaleString('es-ES', { day: '2-digit' }),
        mes: t.toLocaleString('es-ES', { month: '2-digit' }),
        ano: t.toLocaleString('es-ES', { year: 'numeric' })
      }
      this.infofecha$.next(this.vr);
    });
    return this.infofecha$.asObservable();
  }
}
