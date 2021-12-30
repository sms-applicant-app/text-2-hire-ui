import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Applicant } from "../../../shared/models/applicant";
let RegisterApplicantComponent = class RegisterApplicantComponent {
    constructor(fb, authService, applicantService) {
        this.fb = fb;
        this.authService = authService;
        this.applicantService = applicantService;
        this.messageEvent = new EventEmitter();
        this.newApplicant = new Applicant();
    }
    ngOnInit() { }
    initApplicantDetailsForm() {
        this.applicantDetailsForm = this.fb.group({
            applicationName: [''],
            phoneNumber: [''],
        });
    }
    registerApplicant(email, password) {
        this.authService.RegisterUser(email, password).then(data => {
            this.newApplicant.email = email;
            console.log('user registered', data);
        });
    }
    addApplicantDetails() {
        this.newApplicant.name = this.applicantDetailsForm.controls.applicantName.value;
        this.newApplicant.phoneNumber = this.applicantDetailsForm.controls.applicantPhone.value;
        this.newApplicant.franchiseId = this.franchiseId;
        this.newApplicant.storeId = this.storeId;
        this.applicantService.createApplicant(this.newApplicant).then(data => {
            console.log('new applicant added', data);
            this.sendApplicantMessage();
        });
    }
    sendApplicantMessage() {
        this.messageEvent.emit(this.newApplicant);
    }
};
__decorate([
    Input()
], RegisterApplicantComponent.prototype, "franchiseId", void 0);
__decorate([
    Input()
], RegisterApplicantComponent.prototype, "storeId", void 0);
__decorate([
    Output()
], RegisterApplicantComponent.prototype, "messageEvent", void 0);
RegisterApplicantComponent = __decorate([
    Component({
        selector: 'app-register-applicant',
        templateUrl: './register-applicant.component.html',
        styleUrls: ['./register-applicant.component.scss'],
    })
], RegisterApplicantComponent);
export { RegisterApplicantComponent };
//# sourceMappingURL=register-applicant.component.js.map