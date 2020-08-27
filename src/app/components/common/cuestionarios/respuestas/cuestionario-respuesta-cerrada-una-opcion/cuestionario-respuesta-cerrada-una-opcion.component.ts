import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cuestionario-respuesta-cerrada-una-opcion',
  templateUrl: './cuestionario-respuesta-cerrada-una-opcion.component.html',
  styleUrls: ['./cuestionario-respuesta-cerrada-una-opcion.component.css']
})
export class CuestionarioRespuestaCerradaUnaOpcionComponent implements OnInit {

  @Input()
  pregunta: any;

  opcionSeleccionada: any;
  respuestaTexto: string;

  constructor() { }

  ngOnInit() {
    this.cargarRespuesta();
  }

  /**
   * Carga la respuesta previamente indicada en el formulario
   */
  cargarRespuesta() {
    if (this.pregunta && this.pregunta.respuesta && this.pregunta.respuesta.length > 0) {

      if (this.pregunta.opciones && this.pregunta.opciones.length > 0) {
        this.opcionSeleccionada = this.pregunta.opciones.find(op => op.id == this.pregunta.respuesta[0].formularioOpcion.id);
      }

      this.respuestaTexto = this.pregunta.respuesta[0].respuesta;
    }
  }

  /**
   * Actualiza la respuesta de la pregunta cuando cambia las opciones
   */
  actualizarRespuestaOpcionSeleccionada(opcionSeleccionada: any) {
    if (this.pregunta && this.pregunta.respuesta && this.pregunta.respuesta.length > 0) {
      this.pregunta.respuesta[0].formularioOpcion = opcionSeleccionada;
      this.pregunta.respuesta[0].respuesta = (opcionSeleccionada.especificable == true) ? this.respuestaTexto : null;
    } else {
      this.pregunta.respuesta = [
        {
          respuesta: (opcionSeleccionada.especificable == true) ? this.respuestaTexto : null,
          formularioOpcion: opcionSeleccionada
        }
      ];
    }
  }

  /**
   * Servicio que actualiza la respuesta cuando cambia el texto de la respuestas
   * @param respuesta 
   */
  actualizarRespuestaText(respuesta: any) {
    if (this.pregunta && this.pregunta.respuesta && this.pregunta.respuesta.length > 0) {
      this.pregunta.respuesta[0].respuesta = (this.opcionSeleccionada && this.opcionSeleccionada.especificable == true) ? respuesta : null;
    } else {
      this.pregunta.respuesta = [
        {
          respuesta: (this.opcionSeleccionada && this.opcionSeleccionada.especificable == true) ? respuesta : null,
          formularioOpcion: this.opcionSeleccionada
        }
      ];
    }
  }
}
