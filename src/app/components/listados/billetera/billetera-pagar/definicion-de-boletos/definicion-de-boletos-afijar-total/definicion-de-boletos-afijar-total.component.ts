import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-definicion-de-boletos-afijar-total',
  templateUrl: './definicion-de-boletos-afijar-total.component.html',
  styleUrls: ['./definicion-de-boletos-afijar-total.component.css']
})
export class DefinicionDeBoletosAFijarTotalComponent implements OnInit {

  @Input()
  totalMercaderiaACanjear$: BehaviorSubject<number>;

  @Input()
  stockAFijar: number;

  @Input()
  unidadMedida: string;

  @Output()
  definirPresionado: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Retorna la cantidad de mercadería necesaria para cubrir lo indicado en el paso anterior para canjear
   */
  get stockNecesario(): number {
    let total: number = (this.totalMercaderiaACanjear$.getValue()) ? this.totalMercaderiaACanjear$.getValue() : 0;
    return this.stockAFijar - total;
  }

  /**
   * Notifica que ha presionado el botón definir
   */
  notificarDeficionEvento() {
    this.definirPresionado.emit();
  }
}
