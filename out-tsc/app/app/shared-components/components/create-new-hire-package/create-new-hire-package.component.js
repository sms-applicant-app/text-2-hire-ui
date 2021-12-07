import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CreateNewHirePackageComponent = class CreateNewHirePackageComponent {
    constructor(onboadService) {
        this.onboadService = onboadService;
    }
    ngOnInit() {
        this.title = 'Brandons Form Upload';
    }
    getOnboardingByStore(storeId) {
        this.onboadService.getAllOnboardingPackagesByStoreId(storeId);
    }
};
CreateNewHirePackageComponent = __decorate([
    Component({
        selector: 'app-create-new-hire-package',
        templateUrl: './create-new-hire-package.component.html',
        styleUrls: ['./create-new-hire-package.component.scss'],
    })
], CreateNewHirePackageComponent);
export { CreateNewHirePackageComponent };
//# sourceMappingURL=create-new-hire-package.component.js.map