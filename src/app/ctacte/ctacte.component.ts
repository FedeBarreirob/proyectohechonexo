import { Component, OnInit } from '@angular/core';
import { CtacteService } from '../services/ctacte/ctacte.service'
import { ListadoCuentaCorriente, MovimientoCtaCte } from '../interfaces/ctacte/listado.ctacte';
import { FiltroListadoCtaCte } from '../interfaces/ctacte/filtro.listado.ctacte';
import { UserAuth } from '../models/security/user';
import { AuthenticationService } from '../services/security/authentication.service';

@Component({
  selector: 'app-ctacte',
  templateUrl: './ctacte.component.html',
  styleUrls: ['./ctacte.component.css']
})
export class CtacteComponent implements OnInit {

  private listadoCtaCte: Array<MovimientoCtaCte>;

  constructor(
    private ctacteService: CtacteService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  // funcion que ejecuta la carga del listado de ctacte
  cargarListado() {
    let filtro: FiltroListadoCtaCte = {
      cuenta: "12913",
      fechaDesde: "28/01/2016",
      fechaHasta: "23/09/2018"
    }

    console.log(filtro);

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
    if (usuarioLogueado != null) {
      return this.ctacteService.listadoCtaCte(filtro, usuarioLogueado.token).subscribe(respuesta => {
        this.listadoCtaCte = respuesta.datos.listado;

        console.log(this.listadoCtaCte);
      });
    }
  }
}
