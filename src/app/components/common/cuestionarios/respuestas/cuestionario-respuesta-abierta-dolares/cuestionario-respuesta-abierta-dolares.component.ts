import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cuestionario-respuesta-abierta-dolares',
  templateUrl: './cuestionario-respuesta-abierta-dolares.component.html',
  styleUrls: ['./cuestionario-respuesta-abierta-dolares.component.css']
})
export class CuestionarioRespuestaAbiertaDolaresComponent implements OnInit {

  @Input()
  pregunta: any;

  respuesta: number;

  constructor() { }

  ngOnInit() {
    this.cargarRespuesta();
  }

  /**
   * Carga la respuesta previamente indicada en el formulario
   */
  cargarRespuesta() {
    if (this.pregunta && this.pregunta.respuesta && this.pregunta.respuesta.length > 0) {
      this.respuesta = Number.parseFloat(this.pregunta.respuesta[0].respuesta);
    }
  }

  /**
   * Actualiza la respuesta de la pregunta
   */
  actualizarRespuesta(respuesta: number) {
    if (this.pregunta && this.pregunta.respuesta && this.pregunta.respuesta.length > 0) {
      this.pregunta.respuesta[0].respuesta = respuesta.toString();
    } else {
      this.pregunta.respuesta = [
        {
          respuesta: respuesta.toString()
        }
      ];
    }
  }
}
