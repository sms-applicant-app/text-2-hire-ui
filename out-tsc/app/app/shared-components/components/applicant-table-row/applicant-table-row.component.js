import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let ApplicantTableRowComponent = class ApplicantTableRowComponent {
    constructor(fb, applicantService, firestore, dbHelper, smsService, modalController) {
        this.fb = fb;
        this.applicantService = applicantService;
        this.firestore = firestore;
        this.dbHelper = dbHelper;
        this.smsService = smsService;
        this.modalController = modalController;
    }
    ngOnInit() {
        console.log('incoming applicant id', this.applicantId);
        this.actionsFrom = this.fb.group({
            actions: ['']
        });
    }
    submitForm() {
        console.log('applicant id', this.applicantId, this.actionsFrom.value);
    }
};
__decorate([
    Input()
], ApplicantTableRowComponent.prototype, "applicantId", void 0);
ApplicantTableRowComponent = __decorate([
    Component({
        selector: 'app-applicant-table-row',
        templateUrl: './applicant-table-row.component.html',
        styleUrls: ['./applicant-table-row.component.scss'],
    })
], ApplicantTableRowComponent);
export { ApplicantTableRowComponent };
//# sourceMappingURL=applicant-table-row.component.js.map