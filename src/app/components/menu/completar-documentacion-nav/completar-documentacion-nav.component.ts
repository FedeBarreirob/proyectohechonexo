import { Component, OnInit, ViewChild } from '@angular/core';
import { CircleProgressComponent, CircleProgressOptions } from 'ng-circle-progress';

@Component({
  selector: 'app-completar-documentacion-nav',
  templateUrl: './completar-documentacion-nav.component.html',
  styleUrls: ['./completar-documentacion-nav.component.css']
})
export class CompletarDocumentacionNavComponent implements OnInit {

  @ViewChild('circleProgress') circleProgress: CircleProgressComponent;

  constructor() { }

  ngOnInit() {
  }

}
