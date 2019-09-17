import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ResumenContratoCompraVenta } from '../../../../interfaces/contratos/resumen-contrato-compra-venta';
import { BoletoConfirmacionVenta } from '../../../../interfaces/contratos/boleto-confirmacion-venta';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { ContratosService } from '../../../../services/contratos/contratos.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { ComprobantesDownloaderService } from '../../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contrato-detalle-desktop',
  templateUrl: './contrato-detalle-desktop.component.html',
  styleUrls: ['./contrato-detalle-desktop.component.css']
})
export class ContratoDetalleDesktopComponent implements OnInit, OnDestroy {

  @Input()
  modoDetalleDesktopMovimiento$: Subject<ResumenContratoCompraVenta>;

  @Output()
  salir: EventEmitter<any> = new EventEmitter<any>();

  boleto: BoletoConfirmacionVenta;
  resumenContrato: ResumenContratoCompraVenta;
  cargando: boolean = false;
  unidadMedida: string;
  mensajeEntregasVentasPendientes: string = "";
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    private contratosService: ContratosService,
    private authenticationService: AuthenticationService,
    private comprobanteDownloaderService: ComprobantesDownloaderService
  ) { }

  ngOnInit() {
    this.cargarUnidadMedida();

    this.modoDetalleDesktopMovimiento$.subscribe(
      resumen => this.cargar(resumen)
    );

  }

  /**
   * Función encargada de cargar todos los datos
   * @param resumenContrato 
   */
  cargar(resumenContrato: ResumenContratoCompraVenta) {
    this.resumenContrato = resumenContrato;
    this.crearMensajeEntregasVentasPendientes();
    this.cargarBoleto();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Función que carga la unidad de medida desde el perfil
   */
  cargarUnidadMedida() {
    let perfilBasico: PerfilBasico = <PerfilBasico>this.authenticationService.perfilUsuarioSeleccionado();
    if (perfilBasico) {
      this.unidadMedida = perfilBasico.informacionPersonal.unidadMedidaPeso;
    }
  }

  /**
   * 
   */
  cerrar() {
    this.salir.next();
  }

  /**
   * Función encargada de cargar el boleto
   */
  cargarBoleto() {
    if (this.cargando == false) {
      this.cargando = true;

      this.contratosService.contrato(this.resumenContrato.numeroSucursalContrato, this.resumenContrato.numeroComprobanteContrato)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            if (respuesta.exito == true) {
              this.boleto = respuesta.datos;
            }
            this.cargando = false;
          },
          error => {
            console.log(error);
            this.cargando = false;
          }
        );
    }
  }

  /**
   * Función encargada de crear un mensaje acorde al estado de entregas y ventas del contrato
   */
  private crearMensajeEntregasVentasPendientes() {
    let hayPendienteEntregar: boolean = this.resumenContrato.kilosPendientesEntregar != 0;
    let hayPendienteVender: boolean = this.resumenContrato.kilosAFijar != 0;

    // caso 1: Unicamente falta entregar
    if (hayPendienteEntregar && !hayPendienteVender) {
      this.mensajeEntregasVentasPendientes = "Entregas pendientes";
    }

    // caso 2: Unicamente falta vender
    if (!hayPendienteEntregar && hayPendienteVender) {
      this.mensajeEntregasVentasPendientes = "Ventas pendientes";
    }

    // caso 3: Falta entregar y vender
    if (hayPendienteEntregar && hayPendienteVender) {
      this.mensajeEntregasVentasPendientes = "Entregas y ventas pendientes";
    }

    // caso 4: No falta nada
    if (!hayPendienteEntregar && !hayPendienteVender) {
      this.mensajeEntregasVentasPendientes = "";
    }
  }
}
