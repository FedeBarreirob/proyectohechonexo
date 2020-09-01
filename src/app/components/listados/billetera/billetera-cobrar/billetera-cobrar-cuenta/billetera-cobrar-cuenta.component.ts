import { Component, OnInit, Inject } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { CuentaBancariaTipo } from '../../../../../enums/cuenta-bancaria-tipo.enum';
import { CuentasBancariasService } from '../../../../../services/cuentas-bancarias/cuentas-bancarias.service';
import { EntidadAlg } from '../../../../../interfaces/perfiles/entidad-alg';

@Component({
  selector: 'app-billetera-cobrar-cuenta',
  templateUrl: './billetera-cobrar-cuenta.component.html',
  styleUrls: ['./billetera-cobrar-cuenta.component.css']
})
export class BilleteraCobrarCuentaComponent implements OnInit {

  cuenta: EntidadAlg;
  nombrePropietario: string;
  referencia: string;
  cbuCvu: string;
  tipoCuentaSeleccionada: CuentaBancariaTipo;
  esCelular: boolean;

  tipoCuenta = CuentaBancariaTipo;
  guardando: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EntidadAlg,
    private dialogRef: MatDialogRef<BilleteraCobrarCuentaComponent>,
    private snackBar: MatSnackBar,
    private cuentasBancariasService: CuentasBancariasService,
    private deviceService: DeviceDetectorService
  ) {
    this.cuenta = data;
  }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  /**
   * Cierra el dialogo, si indica cuenta creada true indicar que se ha creado una cuenta
   * @param cuentaCreada 
   */
  cerrar(cuentaCreada: boolean) {
    this.dialogRef.close(cuentaCreada);
  }

  /**
   * Muestra una notificacion
   * @param message 
   */
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  /**
   * Registra la cuenta bancaria
   */
  registrarCuenta() {
    if (this.guardando == false) {

      this.guardando = true;

      this.cuentasBancariasService.cuentasBancariasRegistro(this.datosAGuardar())
        .subscribe(respuesta => {
          this.openSnackBar(respuesta.mensaje);

          if (respuesta.exito == true) {
            this.cerrar(true);
          }
        },
          error => {
            console.log(error);
            this.guardando = false;
          },
          () => this.guardando = false);
    }
  }

  /**
   * Devuelve el objeto con los datos listos para enviar al servicio del registro
   */
  datosAGuardar() {
    return {
      entidadCodigo: this.cuenta.id.codigo,
      nombrePropietario: this.nombrePropietario,
      referencia: this.referencia,
      cbuCvu: this.cbuCvu,
      tipoCuenta: this.tipoCuentaSeleccionada
    };
  }
}
