import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contrato-indicador-grafico-porcentual',
  templateUrl: './contrato-indicador-grafico-porcentual.component.html',
  styleUrls: ['./contrato-indicador-grafico-porcentual.component.css']
})
export class ContratoIndicadorGraficoPorcentualComponent implements OnInit {

  @Input()
  texto: string;
  
  @Input()
  subtexto: string;

  @Input()
  porcentual: number;

  constructor() { }

  ngOnInit() {
    console.log(this.porcentual);
  }

}
