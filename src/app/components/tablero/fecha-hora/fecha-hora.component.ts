import { Component, OnInit } from '@angular/core';
import { FechaYHora } from 'src/app/interfaces/reloj/fecha-yhora';
import { RelojService } from 'src/app/services/reloj/reloj.service';

@Component({
  selector: 'app-fecha-hora',
  templateUrl: './fecha-hora.component.html',
  styleUrls: ['./fecha-hora.component.css']
})
export class FechaHoraComponent implements OnInit {

  fechaHora: FechaYHora;

  constructor(private relojService: RelojService) { }

  ngOnInit() {
    this.relojService.getInfoReloj().subscribe(
      infoReloj => this.fechaHora = infoReloj
    );
  }

}
