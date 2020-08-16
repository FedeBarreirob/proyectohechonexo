import { Component, OnInit, ViewChild } from '@angular/core';
import { CircleProgressComponent, CircleProgressOptions } from 'ng-circle-progress';

@Component({
  selector: 'app-completar-documentacion-card',
  templateUrl: './completar-documentacion-card.component.html',
  styleUrls: ['./completar-documentacion-card.component.css']
})
export class CompletarDocumentacionCardComponent implements OnInit {

  @ViewChild('circleProgress') circleProgress: CircleProgressComponent;

  constructor() { }

  ngOnInit() {
  }

}
