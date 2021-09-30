import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
let ApplicantListComponent = class ApplicantListComponent {
    constructor(fb, applicantService, firestore, dbHelper, smsService) {
        this.fb = fb;
        this.applicantService = applicantService;
        this.firestore = firestore;
        this.dbHelper = dbHelper;
        this.smsService = smsService;
        this.messageEvent = new EventEmitter();
        this.applicants = [];
        this.displayColumns = ['applicantName', 'position', 'status', 'phoneNumber', 'actions'];
    }
    ngOnInit() {
        console.log('incoming positionId', this.positionId);
        this.getApplicantsByJobId(this.positionId);
        this.actionsFrom = this.fb.group({
            phoneNumber: [''],
            actions: [''],
            name: [''],
        });
    }
    // get applicants by job
    getApplicantsByJobId(positionId) {
        this.firestore.collection('applicant', ref => ref.where('positionId', '==', `${positionId}`)).get()
            .subscribe(applicant => {
            this.applicants = [];
            if (applicant.docs.length === 0) {
                console.log('no applicants for that position');
            }
            else {
                applicant.forEach(a => {
                    const app = a.data();
                    const id = a.id;
                    this.applicants.push({ id, applicant: app });
                    this.dataSource = new MatTableDataSource(this.applicants);
                });
                console.log(this.applicants);
            }
        });
    }
    submitActionsToApplicants(id) {
        this.dbHelper.doc$(`applicant/${id}`).subscribe(data => {
            this.applicantData = data;
            const applicant = this.applicantData.name;
            const phoneNumber = this.applicantData.phoneNumber;
            const positionId = this.positionId;
            const calendarLink = JSON.parse(localStorage.getItem('appUserData')).calendarLink;
            this.smsService.requestInterview(applicant, positionId, phoneNumber, calendarLink).subscribe(resp => {
                console.log('sent request to lambda', resp);
            });
        });
        this.applicantService.updateApplicant(id, { status: 'interviewRequested' });
    }
    moveApplicantToNextStatus(id) {
        console.log('applicant to update status', id);
        this.dbHelper.doc$(`applicant/${id}`).subscribe(data => {
            console.log('applicant data', data);
        });
    }
    sendMessageGoBackToJobsList() {
        this.messageEvent.emit(false);
    }
    declineApplicant(id) {
        const status = 'applicantDeclined';
        this.applicantService.updateApplicant(id, status);
    }
};
__decorate([
    Input()
], ApplicantListComponent.prototype, "positionId", void 0);
__decorate([
    Output()
], ApplicantListComponent.prototype, "messageEvent", void 0);
ApplicantListComponent = __decorate([
    Component({
        selector: 'app-applicant-list',
        templateUrl: './applicant-list.component.html',
        styleUrls: ['./applicant-list.component.scss'],
    })
], ApplicantListComponent);
export { ApplicantListComponent };
//# sourceMappingURL=applicant-list.component.js.map