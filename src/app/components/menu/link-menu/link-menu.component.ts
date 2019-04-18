import { Component, OnInit, Input } from '@angular/core';
import { ItemLinkMenu } from '../../../interfaces/menu/sidebar/item-link-menu';

@Component({
  selector: 'app-link-menu',
  templateUrl: './link-menu.component.html',
  styleUrls: ['./link-menu.component.css']
})
export class LinkMenuComponent implements OnInit {

  @Input("link")
  link: ItemLinkMenu;

  constructor() { }

  ngOnInit() {
  }

}
