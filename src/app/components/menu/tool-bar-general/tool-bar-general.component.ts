import { Component, OnInit, Input } from '@angular/core';
import { SidebarService } from 'src/app/services/observers/sidebar/sidebar.service';

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

  mostrarBtnMostrarOcultarSidebar: boolean;

  constructor(public sidebarService: SidebarService) { }

  ngOnInit() {

    // suscribir a notificacion de visualizacion del boton sandwiche
    this.sidebarService.mostrarSandwiche$.subscribe(
      mostrar => this.mostrarBtnMostrarOcultarSidebar = mostrar
    );
  }

  // funcion que oculta o muestra el sidebar
  mostrarOcultarSidebar() {
    this.sidebarService.notificarToggle();
  }

}
