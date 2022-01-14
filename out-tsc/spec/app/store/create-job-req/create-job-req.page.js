import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Applicant } from "../../shared/models/applicant";
let CreateJobReqPage = class CreateJobReqPage {
    constructor(fb, firestore) {
        this.fb = fb;
        this.firestore = firestore;
        this.messageEvent = new EventEmitter();
        this.newApplicant = new Applicant();
    }
    ngOnInit() {
        this.userId = JSON.parse(localStorage.getItem('user')).email;
        this.firestore.doc(`users/${this.userId}`).get().subscribe(doc => {
            this.userData = doc.data();
            console.log('franchiseId in query', this.userData.franchiseId);
            this.franchiseId = this.userData.franchiseId;
        });
    }
    sendApplicantMessage() {
        this.messageEvent.emit(this.newApplicant);
    }
};
__decorate([
    Input()
], CreateJobReqPage.prototype, "storeId", void 0);
__decorate([
    Output()
], CreateJobReqPage.prototype, "messageEvent", void 0);
CreateJobReqPage = __decorate([
    Component({
        selector: 'app-create-job-req',
        templateUrl: './create-job-req.page.html',
        styleUrls: ['./create-job-req.page.scss'],
    })
], CreateJobReqPage);
export { CreateJobReqPage };
//# sourceMappingURL=create-job-req.page.js.map