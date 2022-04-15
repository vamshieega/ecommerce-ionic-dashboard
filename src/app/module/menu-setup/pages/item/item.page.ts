import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AppData } from 'src/app/shared/services/app-data.service';
import { MenuItemService } from '../../services/menu-item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
