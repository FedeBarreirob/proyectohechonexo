import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CardMasInformacionComponent } from '../card-mas-informacion/card-mas-informacion.component';


@Component({
  selector: 'app-tabla-operaciones-recientes',
  templateUrl: './tabla-operaciones-recientes.component.html',
  styleUrls: ['./tabla-operaciones-recientes.component.css'],
})
export class TablaOperacionesRecientesComponent implements OnInit {

  esCelular: boolean;

  constructor(
    private deviceService: DeviceDetectorService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  mostrarInfo(){
    let dialogRef = this.dialog.open(CardMasInformacionComponent, {
      maxWidth: '100vw',
      width: '428px',
      maxHeight: '100vh',
      height: '340px'
    });
  }

}
