import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resumen-resumen-cobros',
  templateUrl: './resumen-resumen-cobros.component.html',
  styleUrls: ['./resumen-resumen-cobros.component.css']
})
export class ResumenResumenCobrosComponent implements OnInit {

  @Input()
  cobrosProgramados: Array<any>;

  constructor() { }

  ngOnInit() {
  }

  get total(): number {
    if (this.cobrosProgramados && this.cobrosProgramados.length > 0) {
      return this.cobrosProgramados
        .map(cobro => cobro.monto)
        .reduce((acum: number, current: number) => acum + current);
    } else {
      return 0;
    }
  }
}
