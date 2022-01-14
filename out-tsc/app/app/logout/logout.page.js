import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LogoutPage = class LogoutPage {
    constructor(authService) {
        this.authService = authService;
    }
    ngOnInit() {
        this.authService.SignOut().then(data => {
            console.log("logged out", data);
        });
    }
};
LogoutPage = __decorate([
    Component({
        selector: 'app-logout',
        templateUrl: './logout.page.html',
        styleUrls: ['./logout.page.scss'],
    })
], LogoutPage);
export { LogoutPage };
//# sourceMappingURL=logout.page.js.map