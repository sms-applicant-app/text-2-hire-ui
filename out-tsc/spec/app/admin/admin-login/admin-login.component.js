import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AdminLoginComponent = class AdminLoginComponent {
    constructor(authService, route) {
        this.authService = authService;
        this.route = route;
    }
    ngOnInit() { }
    adminLogin(email, password) {
        this.authService.adminSignIn(email.value, password.value).then(user => {
            this.route.navigate(['admin']);
        });
        //this.routeUserBasedOnRole(this.authService.userData.email);
    }
    ;
};
AdminLoginComponent = __decorate([
    Component({
        selector: 'app-admin-login',
        templateUrl: './admin-login.component.html',
        styleUrls: ['./admin-login.component.scss'],
    })
], AdminLoginComponent);
export { AdminLoginComponent };
//# sourceMappingURL=admin-login.component.js.map