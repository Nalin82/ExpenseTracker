import { Component } from '@angular/core';
import { Client } from 'src/shared/service-proxies/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private client: Client) {
    let storeclient = window.localStorage.getItem('auth');
    if (!storeclient) {
      return;
    }
    const storeClientObj = JSON.parse(storeclient);
    this.client.authToken = storeClientObj.authToken;
    this.client.isAuthenticated = storeClientObj.isAuthenticated;
    this.client.userRoles = storeClientObj.userRoles;
  }
}
