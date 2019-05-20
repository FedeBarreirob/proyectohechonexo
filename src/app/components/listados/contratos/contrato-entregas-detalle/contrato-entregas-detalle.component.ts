import { Component, OnInit, Inject, ViewChild, Input, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSidenav, MatDialog } from '@angular/material';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';
import { Subject } from 'rxjs';
import { MovimientoEntrega } from '../../../../interfaces/entregas/listado-entregas';
import { EntregasDetalleComponent } from '../../entregas/entregas-detalle/entregas-detalle.component';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { FiltroEntregas } from '../../../../interfaces/entregas/filtro-entregas';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contrato-entregas-detalle',
  templateUrl: './contrato-entregas-detalle.component.html',
  styleUrls: ['./contrato-entregas-detalle.component.css']
})
export class ContratoEntregasDetalleComponent implements OnInit, OnDestroy {

  @ViewChild('menuFiltro') public sidenav: MatSidenav;

  observerFiltroListadoMovil$ = new Subject<FiltroEntregas>();
  cuenta: EntidadAlg;
  titulo: string;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private resumenContrato: ResumenContratoCompraVenta,
    private dialogRef: MatDialogRef<ContratoEntregasDetalleComponent>,
    public dialog: MatDialog,
    private cuentaAlgService: CuentaAlgService
  ) { }

  ngOnInit() {
    this.titulo = `Contrato ${this.resumenContrato.numeroComprobanteContrato}`;

    this.cuentaAlgService.cuentaSeleccionada$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuentaAlg => {
          this.cuenta = cuentaAlg;
          this.cargarListado(this.filtroPorDefecto());
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Función que ejecuta la carga del listado de entregas a traves de la notificación del nuevo filtro
   * @param filtro Filtro a notificar
   */
  cargarListado(filtro: FiltroEntregas) {

    let filtroParaElContrato = filtro;
    filtroParaElContrato.especie = this.resumenContrato.especie;
    filtroParaElContrato.cosecha = this.resumenContrato.cosecha;
    filtroParaElContrato.contratoId = this.resumenContrato.contratoId;
    filtroParaElContrato.aplicado = true;

    this.observerFiltroListadoMovil$.next(filtro);
  }

  /**
   * Devuelve el filtro por defecto para una carga inicial del listado
   */
  private filtroPorDefecto(): FiltroEntregas {
    let filtroPorDef: FiltroEntregas = {
      especie: this.resumenContrato.especie,
      cosecha: this.resumenContrato.cosecha,
      contratoId: this.resumenContrato.contratoId,
      cuenta: this.cuenta.id.codigo,
      agrupadoPorCampo: false,
      paginado: true,
      pagina: 0,// el listado agrega los valores de paginación correctos
      cantPorPagina: 0,
      aplicado: true
    };

    return filtroPorDef;
  }

  /**
   * Función que muestra el detalle de un movimiento seleccionado
   * @param movimiento Movimiento seleccionado
   */
  verDetalle(movimiento: MovimientoEntrega) {

    let opciones = {
      data: {
        movimiento: movimiento,
        linkContrato: false
      },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    };

    this.dialog.open(EntregasDetalleComponent, opciones);
  }

  /**
   * Función encargada de mostrar u ocultar los filtros
   */
  mostrarOcultarFiltros() {
    this.sidenav.toggle();
  }

  /**
   * Función encargada de cerrar el modal
   */
  salir() {
    this.dialogRef.close();
  }
}
