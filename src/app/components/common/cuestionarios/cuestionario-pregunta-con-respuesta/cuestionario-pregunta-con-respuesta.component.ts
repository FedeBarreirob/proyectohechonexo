import { Component, OnInit, Input } from '@angular/core';
import { TipoFormularioPregunta } from '../../../../enums/tipo-formulario-pregunta.enum';

@Component({
  selector: 'app-cuestionario-pregunta-con-respuesta',
  templateUrl: './cuestionario-pregunta-con-respuesta.component.html',
  styleUrls: ['./cuestionario-pregunta-con-respuesta.component.css']
})
export class CuestionarioPreguntaConRespuestaComponent implements OnInit {

  @Input()
  pregunta: any;

  tipoFormularioPregunta = TipoFormularioPregunta;

  constructor() { }

  ngOnInit() {
  }

}
