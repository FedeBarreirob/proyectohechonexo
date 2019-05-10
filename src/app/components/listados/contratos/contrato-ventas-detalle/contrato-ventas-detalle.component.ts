import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSidenav, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { FiltroVentas } from '../../../../interfaces/ventas/filtro-ventas';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { MovimientoVenta } from '../../../../interfaces/ventas/listado-ventas';
import { BoletoConfirmacionVenta } from '../../../../interfaces/contratos/boleto-confirmacion-venta';
import { VentasDetalleComponent } from '../../ventas/ventas-detalle/ventas-detalle.component';

@Component({
  selector: 'app-contrato-ventas-detalle',
  templateUrl: './contrato-ventas-detalle.component.html',
  styleUrls: ['./contrato-ventas-detalle.component.css']
})
export class ContratoVentasDetalleComponent implements OnInit {

  @ViewChild('menuFiltro') public sidenav: MatSidenav;

  observerFiltroListadoMovil$ = new Subject<FiltroVentas>();
  cuenta: EntidadAlg;
  titulo: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private boleto: BoletoConfirmacionVenta,
    private dialogRef: MatDialogRef<ContratoVentasDetalleComponent>,
    public dialog: MatDialog,
    private cuentaAlgService: CuentaAlgService
  ) { }

  ngOnInit() {
    this.titulo = `Contrato ${Number(this.boleto.encabezado.slipNroComprobante)}`;

    this.cuentaAlgService.cuentaSeleccionada$.subscribe(
      cuentaAlg => {
        this.cuenta = cuentaAlg;
        this.cargarListado(this.filtroPorDefecto());
      }
    );
  }

  /**
   * Función que ejecuta la carga del listado de ventas a traves de la notificación del nuevo filtro
   * @param filtro Filtro a notificar
   */
  cargarListado(filtro: FiltroVentas) {

    let comprobante = `${this.boleto.encabezado.slipCodComprobante} ${this.boleto.encabezado.slipSucursal} ${this.boleto.encabezado.slipNroComprobante}`;

    let filtroParaElContrato = filtro;
    filtroParaElContrato.especie = this.boleto.encabezado.especie;
    filtroParaElContrato.cosecha = this.boleto.encabezado.cosecha;
    filtroParaElContrato.comprobante = comprobante;

    this.observerFiltroListadoMovil$.next(filtro);
  }

  /**
   * Devuelve el filtro por defecto para una carga inicial del listado
   */
  private filtroPorDefecto(): FiltroVentas {

    let comprobante = `${this.boleto.encabezado.slipCodComprobante} ${this.boleto.encabezado.slipSucursal} ${this.boleto.encabezado.slipNroComprobante}`;

    let filtroPorDef: FiltroVentas = {
      especie: this.boleto.encabezado.especie,
      cosecha: this.boleto.encabezado.cosecha,
      comprobante: comprobante,
      cuenta: this.cuenta.id.codigo,
      paginado: true,
      pagina: 0,// el listado agrega los valores de paginación correctos
      cantPorPagina: 0,
      totales: false
    };

    return filtroPorDef;
  }

  /**
   * Función que muestra el detalle de un movimiento seleccionado
   * @param movimiento Movimiento seleccionado
   */
  verDetalle(movimiento: MovimientoVenta) {

    let opciones = {
      data: movimiento,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    };

    this.dialog.open(VentasDetalleComponent, opciones);
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
