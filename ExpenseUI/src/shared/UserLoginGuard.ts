import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class UserLoginGuard implements CanActivate {
    constructor(protected router: Router) { }

    public canActivate() {
        let client = window.localStorage.getItem('auth');
        if (!client) {
            return false;
        }
        const clientObj = JSON.parse(client);
        if (!clientObj.isAuthenticated || clientObj.userRoles.indexOf('User') === -1) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}