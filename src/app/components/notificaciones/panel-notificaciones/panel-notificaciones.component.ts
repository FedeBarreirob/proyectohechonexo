import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Notificacion } from '../../../interfaces/notificaciones/notificacion';
import { NotificacionesService } from '../../../services/notificaciones/notificaciones.service';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-panel-notificaciones',
  templateUrl: './panel-notificaciones.component.html',
  styleUrls: ['./panel-notificaciones.component.css']
})
export class PanelNotificacionesComponent implements OnInit, OnDestroy {

  @Output()
  botonCerrar: EventEmitter<any> = new EventEmitter<any>();

  destroy$: Subject<any> = new Subject<any>();
  listadoNotificaciones: Array<Notificacion> = [];
  pagina: number = 1;
  cantidadPorPagina: number = 50;
  cargando: boolean = false;
  perfilBasico: PerfilBasico;

  constructor(
    private notificacionService: NotificacionesService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    // observer de perfil
    this.authenticationService.perfilActivo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        perfil => {
          this.perfilBasico = perfil;
          this.cargarListado(true);
        });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  // funcion encargada de cargar el listado de entregas
  cargarListado(limpiar: boolean) {
    if (!this.cargando) {
      this.cargando = true;

      if (limpiar) {
        this.limpiar();
      }

      let perfil = null;
      if (this.perfilBasico) {
        perfil = this.perfilBasico;
      } else {
        perfil = this.authenticationService.perfilUsuarioSeleccionado();
      }

      this.notificacionService.listadoNotificaciones(
        perfil.informacionPersonal.id, this.pagina, this.cantidadPorPagina)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {

          if (respuesta.exito == true && respuesta.datos != null && respuesta.datos.cantidadTotalRegistros > 0) {
            this.agregarMovimientosAlListado(respuesta.datos.listado);
          } else {
            this.pagina = this.pagina - 1;
          }

          this.cargando = false;
        }, error => {
          this.cargando = false;
        });
    }
  }

  // funcion encargada de limpiar para nueva generacion de listado
  private limpiar() {
    this.pagina = 1;
    this.listadoNotificaciones.splice(0, this.listadoNotificaciones.length);
  }

  // funcion encargada de agregar la paginas de datos recuperados al listado
  private agregarMovimientosAlListado(movimientos: Array<Notificacion>) {
    movimientos.forEach(
      movimiento => {
        this.listadoNotificaciones.push(movimiento);
      }
    );
  }

  // funcion que carga mas datos cuando hace scroll
  onScroll() {
    if (this.cargando == false) {
      this.pagina = this.pagina + 1;
      this.cargarListado(false);
    }
  }

  // funcion que dispara la notificacion cuando el boton cerrar se presiona
  cerrar() {
    this.botonCerrar.emit(null);
  }
}
