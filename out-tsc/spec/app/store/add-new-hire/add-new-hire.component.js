import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let AddNewHireComponent = class AddNewHireComponent {
    constructor() { }
    ngOnInit() {
        console.log('incoming applicant', this.applicant);
    }
};
__decorate([
    Input()
], AddNewHireComponent.prototype, "applicant", void 0);
AddNewHireComponent = __decorate([
    Component({
        selector: 'app-add-new-hire',
        templateUrl: './add-new-hire.component.html',
        styleUrls: ['./add-new-hire.component.scss'],
    })
], AddNewHireComponent);
export { AddNewHireComponent };
//# sourceMappingURL=add-new-hire.component.js.map