import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Client } from 'src/shared/service-proxies/client';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  showFiller = false;
  isSideNavOpen = false;
  _router: Router;
  userRole: string = '';

  constructor(router: Router, private client: Client) { 
    this._router = router;
  }

  ngOnInit(): void {
  }

  public onToggleDrawer(): void {
    if (!this.client.isAuthenticated) return;
    this.userRole = this.client.userRoles[0];
    this.drawer.toggle();
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  public routeTo(route: string): void {
    this._router.navigate([`/${route}`]);
  }

  public closeSideNavDrawer() : void {
    this.drawer.close();
    this.isSideNavOpen = false;
  }


}
