import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-resumen-pago-medio-canje',
  templateUrl: './resumen-pago-medio-canje.component.html',
  styleUrls: ['./resumen-pago-medio-canje.component.css']
})
export class ResumenPagoMedioCanjeComponent implements OnInit {

  @Input()
  disponiblesSeleccionados$: BehaviorSubject<Array<any>>;

  modoVerDetalle: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Cambia la visualizacion de detalle
   */
  toggleModoVerDetalle() {
    this.modoVerDetalle = !this.modoVerDetalle;
  }

  totalACanjear(canje: any): number {
    return Number.parseFloat(canje.stockAFijar) + Number.parseFloat(canje.stockAPesificar);
  }
}
