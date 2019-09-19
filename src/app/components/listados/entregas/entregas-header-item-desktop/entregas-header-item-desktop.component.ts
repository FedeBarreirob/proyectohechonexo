import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-entregas-header-item-desktop',
  templateUrl: './entregas-header-item-desktop.component.html',
  styleUrls: ['./entregas-header-item-desktop.component.css']
})
export class EntregasHeaderItemDesktopComponent implements OnInit {

  @Input()
  unidadMedida: string;

  constructor() { }

  ngOnInit() {
  }

}
