import { Injectable } from '@angular/core';
import { EntidadAlg } from 'src/app/interfaces/perfiles/entidad-alg';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaAlgService {

  private _cuentaAlgSeleccionada$ = new Subject<EntidadAlg>();
  public cuentaPreviamenteSeleccionada: EntidadAlg;
  public cuentaAlgSeleccionadaV2$ = new BehaviorSubject<EntidadAlg>(null);

  constructor() { }

  // funcion que notifica la selección de una cuenta dada
  notificarSeleccion(cuentaAlg: EntidadAlg) {
    this.cuentaPreviamenteSeleccionada = cuentaAlg;
    this._cuentaAlgSeleccionada$.next(cuentaAlg);
    this.cuentaAlgSeleccionadaV2$.next(cuentaAlg);
  }

  // devuelve el observable para que el que se suscriba pueda estar informado de cuando se cambia la selección de una cuenta
  get cuentaSeleccionada$(): Observable<EntidadAlg> {
    return this._cuentaAlgSeleccionada$.asObservable();
  }

}
