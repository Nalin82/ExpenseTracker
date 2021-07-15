import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/shared/service-proxies/client';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.css']
})
export class LoginMenuComponent implements OnInit {

  @Output() closeNav = new EventEmitter();
  isLoggedIn: boolean = false;
  _route: Router;
  constructor(route: Router, private client: Client) {
    this._route = route;
    this.isLoggedIn = client.isAuthenticated;
  }

  ngOnInit(): void {
  }

  public openMenu(): void {
    this.isLoggedIn = this.client.isAuthenticated;
  }

  public routeToLogin(): void {
    this._route.navigate(['/login'])
  }

  public routeToLogout(): void {
    this.client.clearAuthToken();
    this.closeNav.next();
    this._route.navigate(['/login'])
  }

  public routeToRegister(): void {
    this._route.navigate(['/register'])
  }
}
