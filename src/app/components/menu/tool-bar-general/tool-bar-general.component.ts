import { Component, OnInit, Input, Output } from '@angular/core';
import { SidebarService } from '../../../services/observers/sidebar/sidebar.service';
import { EventEmitter } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-tool-bar-general',
  templateUrl: './tool-bar-general.component.html',
  styleUrls: ['./tool-bar-general.component.css']
})
export class ToolBarGeneralComponent implements OnInit {

  @Input()
  titulo: string = "titulo";

  @Input()
  urlImagenAccionPersonalizada: string = "assets/toolbar/Campana.png";

  @Input()
  colorIndicador: string = "#666666";

  @Input()
  disabled: boolean = false;

  @Output()
  botonPersonalizadoEjecutado: EventEmitter<any> = new EventEmitter<any>();

  mostrarBtnMostrarOcultarSidebar: boolean;

  constructor(
    public sidebarService: SidebarService,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit() {
    // suscribir a notificacion de visualizacion del boton sandwiche
    this.sidebarService.mostrarSandwiche$.subscribe(
      mostrar => this.mostrarBtnMostrarOcultarSidebar = mostrar
    );

    this.mostrarBtnMostrarOcultarSidebar = this.isPantallaPequena;
  }

  // funcion que oculta o muestra el sidebar
  mostrarOcultarSidebar() {
    this.sidebarService.notificarToggle();
  }

  // funcion que ejecuta el evento correspondiente al boton personalizado
  ejecutarBotonPersonalizado() {
    this.botonPersonalizadoEjecutado.emit(null);
  }

  get isPantallaPequena(): boolean {
    return this.breakpointObserver.isMatched('(max-width: 599px)');
  }
}
