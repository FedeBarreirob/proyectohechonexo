import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ventas-header-item-desktop',
  templateUrl: './ventas-header-item-desktop.component.html',
  styleUrls: ['./ventas-header-item-desktop.component.css']
})
export class VentasHeaderItemDesktopComponent implements OnInit {

  @Input()
  unidadMedida: string;

  constructor() { }

  ngOnInit() {
  }

}
