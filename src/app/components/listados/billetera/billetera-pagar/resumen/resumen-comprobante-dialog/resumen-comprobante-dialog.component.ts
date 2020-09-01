import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-resumen-comprobante-dialog',
  templateUrl: './resumen-comprobante-dialog.component.html',
  styleUrls: ['./resumen-comprobante-dialog.component.css']
})
export class ResumenComprobanteDialogComponent implements OnInit {

  solicitudDePagoCreada: any;
  unidadMedida: string;
  total: number;
  esCelular: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deviceService: DeviceDetectorService,
    private dialogRef: MatDialogRef<ResumenComprobanteDialogComponent>
  ) {
    this.solicitudDePagoCreada = data.solicitudCreada;
    this.unidadMedida = data.unidadMedida;
    this.total = data.total;
  }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  volverAlInicio() {
    this.dialogRef.close(false);
  }

  realizarNuevoPago() {
    this.dialogRef.close(true);
  }

}
