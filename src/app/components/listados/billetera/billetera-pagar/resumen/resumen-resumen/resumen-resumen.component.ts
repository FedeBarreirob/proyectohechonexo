import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resumen-resumen',
  templateUrl: './resumen-resumen.component.html',
  styleUrls: ['./resumen-resumen.component.css']
})
export class ResumenResumenComponent implements OnInit {

  @Input()
  solicitudDePagoCreada: any;

  @Input()
  unidadMedida: string;

  @Input()
  total: number;

  constructor() { }

  ngOnInit() {
  }

}
