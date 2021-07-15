export class ApiBase {
    authToken = '';
    isAuthenticated: boolean = false;
    userRoles: string[] = [];
    protected constructor() {
    }

    setAuthToken(token: string, userRoles: string[]) {
        this.authToken = token;
        this.isAuthenticated = true;
        this.userRoles = userRoles;
        window.localStorage.setItem('auth', JSON.stringify({'authToken': this.authToken, 'isAuthenticated': true, 'userRoles': this.userRoles}));
    }

    clearAuthToken(): void {
        this.authToken = '';
        this.isAuthenticated = false;
        this.userRoles = [];
        window.localStorage.removeItem('auth');
    }

    protected transformOptions(options: any): Promise<any> {
        options.headers = options.headers.append('authorization', `Bearer ${this.authToken}`);
        return Promise.resolve(options);
    }
}