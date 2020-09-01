import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cuestionario-respuesta-cerrada-multiples-opciones',
  templateUrl: './cuestionario-respuesta-cerrada-multiples-opciones.component.html',
  styleUrls: ['./cuestionario-respuesta-cerrada-multiples-opciones.component.css']
})
export class CuestionarioRespuestaCerradaMultiplesOpcionesComponent implements OnInit {


  //TODO: falta terminar y como no se usa por ahora se deja así

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
