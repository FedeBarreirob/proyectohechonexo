import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { TercerosService } from '../../../../services/acceso-terceros/terceros.service';
import { TerceroBasico } from '../../../../interfaces/acceso-terceros/tercero-basico';
import { FiltroGenericoListaConFiltroId } from '../../../../interfaces/varios/filtro-generico-lista-con-filtroid';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSlideToggleChange, MatDialog, MatSnackBar } from '@angular/material';
import { AccesoTercerosEdicionComponent } from '../acceso-terceros-edicion/acceso-terceros-edicion.component';

@Component({
  selector: 'app-terceros-lista-desktop',
  templateUrl: './terceros-lista-desktop.component.html',
  styleUrls: ['./terceros-lista-desktop.component.css']
})
export class TercerosListaDesktopComponent implements OnInit, OnDestroy {

  @Input()
  perfilBasico: PerfilBasico;

  @Input()
  notificacionTerceroActualizado$: Subject<any>;

  @Output()
  edicionTercero: EventEmitter<TerceroBasico> = new EventEmitter<TerceroBasico>();

  destroy$: Subject<any> = new Subject<any>();
  cargando: boolean = false;
  listadoTerceros: Array<TerceroBasico> = [];
  pagina: number = 1;
  cantidadPorPagina: number = 50;
  filtro: FiltroGenericoListaConFiltroId = {
    filtro: "",
    numeroPagina: 1,
    cantPorPagina: 25,
    filtroId: 0
  };

  infoColaboradores = "Un colaborador es una persona que puede tener acceso a tu cuenta para ver detalles de información. Crea un nombre de usuario y contraseña y compartíselo para que pueda entrar a la plataforma.";

  constructor(
    private terceroService: TercerosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.filtro.filtroId = this.perfilBasico.informacionPersonal.id;
    this.cargarListado(true);

    this.notificacionTerceroActualizado$.subscribe(
      () => this.cargarListado(true)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Función encargada de cargar los accesos a terceros
   */
  cargarListado(limpiar: boolean) {
    if (!this.cargando) {
      this.cargando = true;

      if (limpiar) {
        this.limpiar();
      }

      this.filtro.numeroPagina = this.pagina;
      this.filtro.cantPorPagina = this.cantidadPorPagina;

      this.terceroService.listadoPaginado(this.filtro)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {

          // si no hay datos, reestablecer la pagina
          if (respuesta.datos == null || respuesta.datos.length == 0) {
            this.pagina = this.pagina - 1;
          }

          if (respuesta.exito == true && respuesta.datos != null) {
            this.agregarMovimientosAlListado(respuesta.datos.listado);
          }

          this.cargando = false;
        }, error => {
          this.cargando = false;
        });
    }
  }

  /**
   * Función encargada de limpiar para nueva generacion de listado
   */
  private limpiar() {
    this.pagina = 1;
    this.listadoTerceros.splice(0, this.listadoTerceros.length);
  }

  /**
   * Función encargada de agregar la paginas de datos recuperados al listado
   * @param movimientos movimientos a agregar
   */
  private agregarMovimientosAlListado(movimientos: Array<TerceroBasico>) {
    movimientos.forEach(
      movimiento => {
        this.listadoTerceros.push(movimiento);
      }
    );
  }

  /**
   * Función que carga mas datos cuando hace scroll
   */
  onScroll() {
    if (this.cargando == false) {
      this.pagina = this.pagina + 1;
      this.cargarListado(false);
    }
  }

  /**
   * Notifica que se ha seleccionado un tercero para ver o editar
   * @param tercero Tercero a ver o editar
   */
  verEditar(tercero: TerceroBasico) {

    this.edicionTercero.emit(tercero);

    /*const dialogRef = this.dialog.open(AccesoTercerosEdicionComponent, {
      data: tercero,
      panelClass: 'modal-sin-padding'
    });*/

    /*dialogRef.afterClosed().subscribe(
      () => this.cargarListado(true)
    );*/
  }

	/**
   * Función que notifica un tercero con su estado de habilitación a asignarle
   * @param tercero 
   * @param $event 
   */
  habilitacion(tercero: TerceroBasico, $event: MatSlideToggleChange) {
    tercero.credencial.baja = !$event.checked;

    this.terceroService.darDeBajaTercero(
      tercero.id,
      tercero.credencial.baja
    ).subscribe(
      respuesta => {
        if (respuesta.exito == false) {
          this.cargarListado(true);
        }

        this.openSnackBar(respuesta.mensaje);
      },
      error => console.log(error)
    );
  }

  /**
   * Notifica que se debe mostrar un modal para agregar un tercero
   */
  agregarTercero() {
    this.edicionTercero.emit(null);
    /*let dialorRef = this.dialog.open(AccesoTercerosEdicionComponent, {
      panelClass: 'modal-sin-padding'
    });

    dialorRef.afterClosed().subscribe(
      () => this.cargarListado(true)
    );*/
  }

  // abre una notificacion
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  /**
   * Borra un tercero
   * @param tercero 
   */
  borrar(tercero: TerceroBasico) {
    if (!this.cargando) {
      let mensaje = `¿Está seguro de borrar el tercero ${tercero.credencial.username}?`;

      if (confirm(mensaje)) {

        this.cargando = true;

        this.terceroService.eliminarTercero(
          tercero.id
        ).subscribe(
          respuesta => {
            this.cargando = false;
            this.openSnackBar(respuesta.mensaje);
            if (respuesta.exito == true) {
              this.cargarListado(true);
            }
          },
          error => {
            console.log(error);
            this.cargando = false;
          }
        );
      }
    }
  }
}
