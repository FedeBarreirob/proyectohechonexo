import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-situacion-usuario',
  templateUrl: './situacion-usuario.component.html',
  styleUrls: ['./situacion-usuario.component.css']
})
export class SituacionUsuarioComponent implements OnInit {

  esCelular: boolean;

  constructor(
    private deviceService: DeviceDetectorService,
    private dialogRef: MatDialogRef<SituacionUsuarioComponent>
    ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  salir() {
    this.dialogRef.close();
  }
}
