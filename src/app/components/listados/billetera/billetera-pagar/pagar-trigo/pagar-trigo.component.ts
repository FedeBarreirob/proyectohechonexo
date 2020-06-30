import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDialog } from '@angular/material';
import { SojaDialogComponent } from '../pagar-soja/soja-dialog/soja-dialog.component';

@Component({
  selector: 'app-pagar-trigo',
  templateUrl: './pagar-trigo.component.html',
  styleUrls: ['./pagar-trigo.component.css']
})
export class PagarTrigoComponent implements OnInit {

  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService, private dialog: MatDialog) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  solicitarInfo(){
    let dialogRef = this.dialog.open(SojaDialogComponent, {
      maxWidth: '80vw',
      width: '80%',
      maxHeight: '60vh',
      height: '60%'
    });
  }
}
