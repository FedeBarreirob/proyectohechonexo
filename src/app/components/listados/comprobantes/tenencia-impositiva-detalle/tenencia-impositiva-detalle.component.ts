import { Component, OnInit, Input } from '@angular/core';
import { TenenciaImpositiva } from '../../../../interfaces/informacion-tributaria/tenencia-impositiva/tenencia-impositiva';

@Component({
  selector: 'app-tenencia-impositiva-detalle',
  templateUrl: './tenencia-impositiva-detalle.component.html',
  styleUrls: ['./tenencia-impositiva-detalle.component.css']
})
export class TenenciaImpositivaDetalleComponent implements OnInit {

  @Input()
  tenenciaImpositiva: TenenciaImpositiva;

  @Input()
  unidadMedida: string;

  constructor() { }

  ngOnInit() {
  }

}
