import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-de-solicitudes-listado-item',
  templateUrl: './gestion-de-solicitudes-listado-item.component.html',
  styleUrls: ['./gestion-de-solicitudes-listado-item.component.css']
})
export class GestionDeSolicitudesListadoItemComponent implements OnInit {

  @Input()
  solicitud: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  get urlAvatar(): string {
    if (this.solicitud && this.solicitud.perfilBasicoInfoPersonalDTO && this.solicitud.perfilBasicoInfoPersonalDTO.avatar && this.solicitud.perfilBasicoInfoPersonalDTO.avatar !== "") {
      return this.solicitud.perfilBasicoInfoPersonalDTO.avatar;
    } else {
      return "assets/perfil/sin-foto.jpg";
    }
  }

  editar() {
    let url = `/pagar/${this.solicitud.id}`;
    this.router.navigate([url]);
  }
}
