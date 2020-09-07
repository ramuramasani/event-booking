import { Component } from '@angular/core';

import { List } from "./pages/list.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedlists: List[] = [];

  onListAdded(list) {
    this.storedlists.push(list);
  }
}
