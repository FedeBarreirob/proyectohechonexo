import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatDialog, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TarjetaTabContainerComponent } from '../tarjeta-tab-container/tarjeta-tab-container.component';
import { PagarCobrarContainerComponent } from '../pagar-cobrar-container/pagar-cobrar-container.component';

@Component({
  selector: 'app-billetera',
  templateUrl: './billetera.component.html',
  styleUrls: ['./billetera.component.css']
})
export class BilleteraComponent implements OnInit {

  esCelular: boolean;

  constructor(
    private deviceService: DeviceDetectorService,
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
