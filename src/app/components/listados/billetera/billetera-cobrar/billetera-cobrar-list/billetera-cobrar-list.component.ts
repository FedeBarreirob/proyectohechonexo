import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDialog } from '@angular/material';
import { BilleteraLiquidacionesDetalleComponent } from '../../billetera-liquidaciones-detalle/billetera-liquidaciones-detalle.component';

@Component({
  selector: 'app-billetera-cobrar-list',
  templateUrl: './billetera-cobrar-list.component.html',
  styleUrls: ['./billetera-cobrar-list.component.css']
})
export class BilleteraCobrarListComponent implements OnInit {

  @Input()
  dinerosPorCobrar: any;

  esCelular = false;

  constructor(
    private deviceService: DeviceDetectorService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  verDetalle(movimientosPorCobrar: Array<any>) {
    if (movimientosPorCobrar) {
      this.dialog.open(BilleteraLiquidacionesDetalleComponent, {
        data: movimientosPorCobrar,
        maxWidth: '90vw',
        width: '90%',
        maxHeight: '90vh',
        height: '90%'
      });
    }
  }
}
