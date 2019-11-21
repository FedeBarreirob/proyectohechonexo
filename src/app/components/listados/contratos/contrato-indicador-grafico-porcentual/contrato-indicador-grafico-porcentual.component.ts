import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contrato-indicador-grafico-porcentual',
  templateUrl: './contrato-indicador-grafico-porcentual.component.html',
  styleUrls: ['./contrato-indicador-grafico-porcentual.component.css']
})
export class ContratoIndicadorGraficoPorcentualComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  texto: string;
  
  @Input()
  subtexto: string;

  @Input()
  porcentual: number;

  @Input()
  mostrarPorcentual: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
