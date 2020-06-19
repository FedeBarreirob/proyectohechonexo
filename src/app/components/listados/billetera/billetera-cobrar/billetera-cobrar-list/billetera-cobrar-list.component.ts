import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDialog } from '@angular/material';
import { BilleteraLiquidacionesDetalleComponent } from '../../billetera-liquidaciones-detalle/billetera-liquidaciones-detalle.component';
import { FechasUtilService } from '../../../../../services/sharedServices/convertidores/fechas-util.service';

@Component({
  selector: 'app-billetera-cobrar-list',
  templateUrl: './billetera-cobrar-list.component.html',
  styleUrls: ['./billetera-cobrar-list.component.css']
})
export class BilleteraCobrarListComponent implements OnInit {

  @Input()
  dinerosPorCobrar: any;

  @Output()
  cobrar: EventEmitter<any> = new EventEmitter<any>();

  esCelular = false;

  constructor(
    private deviceService: DeviceDetectorService,
    public dialog: MatDialog,
    private fechasUtilService: FechasUtilService
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

  notificarVencimientoACobrar(unDineroPorCobrar: any) {
    this.cobrar.emit({
      montoMaximoACobrar: unDineroPorCobrar.totalPesos,
      fechaVencimiento: this.fechasUtilService.fechaEsADate(unDineroPorCobrar.fechaVencimiento)
    });
  }
}
