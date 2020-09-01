import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-resumen-comprobante-dialog-cobros',
  templateUrl: './resumen-comprobante-dialog-cobros.component.html',
  styleUrls: ['./resumen-comprobante-dialog-cobros.component.css']
})
export class ResumenComprobanteDialogCobrosComponent implements OnInit {

  solicitudDeCobroCreada: any;
  esCelular: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deviceService: DeviceDetectorService,
    private dialogRef: MatDialogRef<ResumenComprobanteDialogCobrosComponent>
  ) {
    this.solicitudDeCobroCreada = data;
  }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  volverAlInicio() {
    this.dialogRef.close(false);
  }

  realizarNuevoCobro() {
    this.dialogRef.close(true);
  }
}
