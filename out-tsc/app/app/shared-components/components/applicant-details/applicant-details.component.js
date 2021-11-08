import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let ApplicantDetailsComponent = class ApplicantDetailsComponent {
    constructor(applicantService, fb, dbHelper) {
        this.applicantService = applicantService;
        this.fb = fb;
        this.dbHelper = dbHelper;
    }
    ngOnInit() {
        console.log('incoming applicant', this.applicant);
        this.interviewFormInit();
        this.applicantData = this.applicant;
    }
    interviewFormInit() {
        this.interviewNotes = this.fb.group({
            interviewNotes: ['']
        });
    }
};
__decorate([
    Input()
], ApplicantDetailsComponent.prototype, "applicant", void 0);
ApplicantDetailsComponent = __decorate([
    Component({
        selector: 'app-applicant-details',
        templateUrl: './applicant-details.component.html',
        styleUrls: ['./applicant-details.component.scss'],
    })
], ApplicantDetailsComponent);
export { ApplicantDetailsComponent };
//# sourceMappingURL=applicant-details.component.js.map