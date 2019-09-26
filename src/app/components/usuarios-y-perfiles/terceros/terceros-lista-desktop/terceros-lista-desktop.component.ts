import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { TercerosService } from '../../../../services/acceso-terceros/terceros.service';
import { TerceroBasico } from '../../../../interfaces/acceso-terceros/tercero-basico';
import { FiltroGenericoListaConFiltroId } from '../../../../interfaces/varios/filtro-generico-lista-con-filtroid';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-terceros-lista-desktop',
  templateUrl: './terceros-lista-desktop.component.html',
  styleUrls: ['./terceros-lista-desktop.component.css']
})
export class TercerosListaDesktopComponent implements OnInit, OnDestroy {

  @Input()
  perfilBasico: PerfilBasico;

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

  constructor(
    private terceroService: TercerosService
  ) { }

  ngOnInit() {
    this.filtro.filtroId = this.perfilBasico.informacionPersonal.id;
    this.cargarListado(true);
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
}
