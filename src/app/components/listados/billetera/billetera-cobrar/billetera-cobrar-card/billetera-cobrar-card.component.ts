import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDialog } from '@angular/material';
import { BilleteraLiquidacionesDetalleComponent } from '../../billetera-liquidaciones-detalle/billetera-liquidaciones-detalle.component';

@Component({
  selector: 'app-billetera-cobrar-card',
  templateUrl: './billetera-cobrar-card.component.html',
  styleUrls: ['./billetera-cobrar-card.component.css']
})
export class BilleteraCobrarCardComponent implements OnInit {

  @Input()
  dineroDisponible: any;

  esCelular = false;
  total: number = 0;

  constructor(
    private deviceService: DeviceDetectorService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
    this.total = this.dineroDisponible.totalPesos;
  }

  verDetalle() {
    if (this.dineroDisponible) {
      this.dialog.open(BilleteraLiquidacionesDetalleComponent, {
        data: this.dineroDisponible.movimientosACobrarVencido,
        maxWidth: '90vw',
        width: '90%',
        maxHeight: '90vh',
        height: '90%'
      });
    }
  }
}
