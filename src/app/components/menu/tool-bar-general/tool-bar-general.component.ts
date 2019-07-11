import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { SidebarService } from '../../../services/observers/sidebar/sidebar.service';
import { EventEmitter } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tool-bar-general',
  templateUrl: './tool-bar-general.component.html',
  styleUrls: ['./tool-bar-general.component.css']
})
export class ToolBarGeneralComponent implements OnInit, OnDestroy {

  @Input()
  titulo: string = "titulo";

  @Input()
  urlImagenAccionPersonalizada: string = null;

  @Input()
  colorIndicador: string = "#666666";

  @Input()
  disabled: boolean = false;

  @Output()
  botonPersonalizadoEjecutado: EventEmitter<any> = new EventEmitter<any>();

  mostrarBtnMostrarOcultarSidebar: boolean;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    public sidebarService: SidebarService,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit() {
    // suscribir a notificacion de visualizacion del boton sandwiche
    this.sidebarService.mostrarSandwiche$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        mostrar => this.mostrarBtnMostrarOcultarSidebar = mostrar
      );

    this.mostrarBtnMostrarOcultarSidebar = this.isPantallaPequena;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
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
