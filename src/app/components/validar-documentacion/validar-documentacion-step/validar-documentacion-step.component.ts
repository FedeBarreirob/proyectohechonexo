import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FrenteDniComponent } from '../frente-dni/frente-dni.component';
import { MatDialog } from '@angular/material';
import { SelfieComponent } from '../selfie/selfie.component';
import { DorsoDniComponent } from '../dorso-dni/dorso-dni.component';

@Component({
  selector: 'app-validar-documentacion-step',
  templateUrl: './validar-documentacion-step.component.html',
  styleUrls: ['./validar-documentacion-step.component.css']
})
export class ValidarDocumentacionStepComponent implements OnInit {

  esCelular: boolean;

  constructor(private dialog: MatDialog,private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }


  sacarFotoFrente() {
    this.dialog.open(FrenteDniComponent, {
      maxWidth: '100vw',
      width: '100%',
      maxHeight: '100vh',
      height: '100%'
    });
  }

  sacarFotoDorso() {
    this.dialog.open(DorsoDniComponent, {
      maxWidth: '100vw',
      width: '100%',
      maxHeight: '100vh',
      height: '100%'
    });
  }

  sacarFotoSelfie() {
    this.dialog.open(SelfieComponent, {
      maxWidth: '100vw',
      width: '100%',
      maxHeight: '100vh',
      height: '100%'
    });
  }

}
