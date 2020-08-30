import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-modal-envio-restablecer-password',
  templateUrl: './modal-envio-restablecer-password.component.html',
  styleUrls: ['./modal-envio-restablecer-password.component.css']
})
export class ModalEnvioRestablecerPasswordComponent implements OnInit {

  esCelular: boolean;

  constructor(
    private deviceService: DeviceDetectorService,
    private dialogRef: MatDialogRef<ModalEnvioRestablecerPasswordComponent>) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  salir(){
		this.dialogRef.close();
	}
}
