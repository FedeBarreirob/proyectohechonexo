import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input()
  cargando$: Subject<boolean>;

  @Input()
  texto: string;

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.cargando$.subscribe(
      mostrar => {
        if (mostrar == true) {
          this.spinner.show();
        } else {
          this.spinner.hide();
        }
      }
    );
  }

}
