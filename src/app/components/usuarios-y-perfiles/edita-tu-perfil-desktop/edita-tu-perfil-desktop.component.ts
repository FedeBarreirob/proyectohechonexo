import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';

@Component({
  selector: 'app-edita-tu-perfil-desktop',
  templateUrl: './edita-tu-perfil-desktop.component.html',
  styleUrls: ['./edita-tu-perfil-desktop.component.css']
})
export class EditaTuPerfilDesktopComponent implements OnInit {

  @Input()
  perfilBasico$: Subject<PerfilBasico>;

  @Output()
  salir: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
