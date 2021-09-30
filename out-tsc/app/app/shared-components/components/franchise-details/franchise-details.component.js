import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let FranchiseDetailsComponent = class FranchiseDetailsComponent {
    constructor(franchiseService, storeService, userService, activatedRoute) {
        this.franchiseService = franchiseService;
        this.storeService = storeService;
        this.userService = userService;
        this.activatedRoute = activatedRoute;
        this.currentFranchise = null;
    }
    ngOnInit() {
        this.franchiseData = '';
        this.franchiseId = this.activatedRoute.snapshot.paramMap.get('id');
        console.log('franchise ID =', this.franchiseId);
        this.franchiseService.getFranchiseById(this.franchiseId).subscribe(data => {
            console.log('franchise details', data);
            this.franchiseData = data;
        });
    }
    ngOnChanges() {
        this.currentFranchise = Object.assign({}, this.franchisee);
    }
};
__decorate([
    Input()
], FranchiseDetailsComponent.prototype, "franchisee", void 0);
__decorate([
    Input()
], FranchiseDetailsComponent.prototype, "franchiseId", void 0);
FranchiseDetailsComponent = __decorate([
    Component({
        selector: 'app-franchise-details',
        templateUrl: './franchise-details.component.html',
        styleUrls: ['./franchise-details.component.scss'],
    })
], FranchiseDetailsComponent);
export { FranchiseDetailsComponent };
//# sourceMappingURL=franchise-details.component.js.map