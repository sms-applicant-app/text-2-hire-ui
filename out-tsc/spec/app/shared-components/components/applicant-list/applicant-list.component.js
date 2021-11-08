import { __awaiter, __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddNewHireComponent } from "../../../store/add-new-hire/add-new-hire.component";
import { ApplicantDetailsComponent } from "../applicant-details/applicant-details.component";
let ApplicantListComponent = class ApplicantListComponent {
    constructor(fb, applicantService, firestore, dbHelper, smsService, modalController, alertService) {
        this.fb = fb;
        this.applicantService = applicantService;
        this.firestore = firestore;
        this.dbHelper = dbHelper;
        this.smsService = smsService;
        this.modalController = modalController;
        this.alertService = alertService;
        this.messageEvent = new EventEmitter();
        this.applicants = [];
        this.displayColumns = ['applicantName', 'position', 'status', 'phoneNumber', 'actions'];
    }
    ngOnInit() {
        this.touchedRows = [];
        this.actionsFrom = this.fb.group({
            tableRows: this.fb.array([])
        });
        console.log('incoming positionId', this.positionId);
        this.getApplicantsByJobId(this.positionId);
        this.isSubmitted = false;
        this.actionsFrom = this.fb.group({
            actions: [''],
        });
        this.applicantRetrieved = false;
    }
    ngAfterOnInit() {
        this.control = this.actionsFrom.get('tableRows');
    }
    submitForm(applicant) {
        const action = this.actionsFrom.controls.actions.value;
        console.log(action);
        console.log(applicant, action);
        if (action === 'scheduleInterview') {
            this.getApplicantAndSendCalendarLink(applicant, action);
        }
        if (action === 'interviewApplicant') {
            // route to a notes/ applicant details
            console.log('Interviewing applicant', applicant);
            this.getApplicantAndBringUpInterviewNotesModal(applicant, action);
        }
        if (action === 'hireApplicant') {
            this.getApplicantAndSendOnboardingLinks(applicant, action);
        }
        // this.submitActionsToApplicants(this.touchedRows)*/
        //this.applicantService.updateApplicant(applicantId, {status: action} );
    }
    getApplicantAndSendOnboardingLinks(applicant, action) {
        this.addNewHire(applicant).then(data => {
            console.log('display onboarding modal');
        });
    }
    getApplicantAndBringUpInterviewNotesModal(applicant, action) {
        // route hiring manger to new hire page
        const email = applicant.email;
        console.log('Hire Applicant', applicant);
        this.applicantDetails(applicant).then(data => {
            console.log('display new hire modal');
        });
    }
    getApplicantAndSendCalendarLink(applicant, action) {
        console.log('applicant data ', applicant);
        const email = applicant.applicant.email;
        const applicantName = applicant.applicant.name;
        const phoneNumber = applicant.applicant.phoneNumber;
        const positionId = this.positionId;
        const calendarLink = JSON.parse(localStorage.getItem('appUserData')).calendarLink;
        this.smsService.requestInterview(applicantName, positionId, phoneNumber, calendarLink).subscribe((data) => {
            console.log('sent request to lambda', data);
            if (data.errorType === 'Error') {
                const options = {
                    autoClose: false,
                    keepAfterRouteChange: false
                };
                console.log('trigger alert', data.errorType);
                this.applicantService.updateApplicant(email, { status: 'Last Message Failed' });
                this.alertService.onAlert('default-alert').subscribe(m => {
                    console.log('where is my alert?', m, data.errorMessage);
                });
            }
            else {
                this.applicantService.updateApplicant(email, { status: action });
            }
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
    applicantDetails(applicant) {
        return __awaiter(this, void 0, void 0, function* () {
            const applicantDetails = yield this.modalController.create({
                component: ApplicantDetailsComponent,
                swipeToClose: true,
                componentProps: {
                    applicant
                }
            });
            return yield applicantDetails.present();
        });
    }
    addNewHire(applicant) {
        return __awaiter(this, void 0, void 0, function* () {
            // add onboarding packages
            console.log('applicant', applicant);
            const addNewHireModal = yield this.modalController.create({
                component: AddNewHireComponent,
                swipeToClose: true,
                componentProps: {
                    applicant
                }
            });
            return yield addNewHireModal.present();
        });
    }
    sendMessageGoBackToJobsList() {
        this.messageEvent.emit(false);
    }
    declineApplicant(id) {
        const status = 'applicantDeclined';
        // todo send message from Lambda
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