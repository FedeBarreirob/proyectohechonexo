import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cuestionario-respuesta-abierta-texto',
  templateUrl: './cuestionario-respuesta-abierta-texto.component.html',
  styleUrls: ['./cuestionario-respuesta-abierta-texto.component.css']
})
export class CuestionarioRespuestaAbiertaTextoComponent implements OnInit {

  @Input()
  pregunta: any;

  respuesta: string;

  constructor() { }

  ngOnInit() {
    this.cargarRespuesta();
  }

  /**
   * Carga la respuesta previamente indicada en el formulario
   */
  cargarRespuesta() {
    if (this.pregunta && this.pregunta.respuesta && this.pregunta.respuesta.length > 0) {
      this.respuesta = this.pregunta.respuesta[0].respuesta;
    }
  }

  /**
   * Actualiza la respuesta de la pregunta
   */
  actualizarRespuesta(respuesta: string) {
    if (this.pregunta && this.pregunta.respuesta && this.pregunta.respuesta.length > 0) {
      this.pregunta.respuesta[0].respuesta = respuesta;
    } else {
      this.pregunta.respuesta = [
        {
          respuesta
        }
      ];
    }
  }
}
