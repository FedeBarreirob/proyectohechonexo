import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _toggle$ = new Subject<boolean>();
  private _mostrarBotonSandwiche$ = new Subject<boolean>();

  // notifica que hubo un cambio en el toggle del sidebar y se debe ocultar o mostrar segun corresponda
  notificarToggle(): void {
    this._toggle$.next(true);
  }

  // devuelve el observable para que el que se suscriba pueda estar informado de cuando debe mostrar u ocultar el sidebar
  get toggle$(): Observable<boolean> {
    return this._toggle$.asObservable();
  }

  // funcion que indica si se debe mostrar el boton sandwiche
  notificarVisibilidadBotonSandwiche(mostrar: boolean) {
    this._mostrarBotonSandwiche$.next(mostrar);
  }

  // devuelve el observable para que el toolbar se entere si debe mostrar o no el sandwiche
  get mostrarSandwiche$(): Observable<boolean> {
    return this._mostrarBotonSandwiche$.asObservable();
  }

}
