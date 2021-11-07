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
        this.addRow();
        console.log('incoming positionId', this.positionId);
        this.getApplicantsByJobId(this.positionId);
        this.isSubmitted = false;
        /*  this.actionsFrom = this.fb.group({
            actions: [''],
            applicantId: ['']
          });*/
    }
    ngAfterOnInit() {
        this.control = this.actionsFrom.get('tableRows');
    }
    initiateForm() {
        return this.fb.group({
            actions: [''],
            applicantId: [''],
            isEditable: [true]
        });
    }
    addRow() {
        const control = this.actionsFrom.get('tableRows');
        control.push(this.initiateForm());
    }
    editRow(group) {
        group.get('isEditable').setValue(true);
    }
    get getFormControls() {
        const control = this.actionsFrom.get('tableRows');
        return control;
    }
    submitForm() {
        const control = this.actionsFrom.get('tableRows');
        this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
        let formValues = this.touchedRows;
        const id = formValues[0].applicantId;
        const action = formValues[0].actions;
        this.applicantId = id;
        console.log(id, action);
        this.dbHelper.doc$(`applicant/${id}`).subscribe(data => {
            this.applicantData = data;
        });
        if (action === 'scheduleInterview' && this.applicantData) {
            const applicant = this.applicantData.name;
            const phoneNumber = this.applicantData.phoneNumber;
            const positionId = this.positionId;
            const calendarLink = JSON.parse(localStorage.getItem('appUserData')).calendarLink;
            this.smsService.requestInterview(applicant, positionId, phoneNumber, calendarLink).subscribe((data) => {
                console.log('sent request to lambda', data);
                if (data.errorType === 'Error') {
                    const options = {
                        autoClose: false,
                        keepAfterRouteChange: false
                    };
                    console.log('trigger alert', data);
                    this.alertService.error(data.errorMessage, options);
                }
                else {
                    this.applicantService.updateApplicant(id, { status: action });
                }
            });
        }
        if (action === "hireApplicant") {
            // route hiring manger to new hire page
            const email = this.applicantId;
            console.log('applcant data', this.applicantData);
            this.addNewHire(email).then(data => {
                console.log('display new hire modal');
            });
        }
        if (action === 'interviewCompleted') {
            // route to a notes/ applicant details
            const email = this.applicantId;
            console.log('applicant data', this.applicantData);
            this.applicantDetails(email).then(data => {
                console.log('applicant details');
            });
        }
        // this.submitActionsToApplicants(this.touchedRows)
        this.applicantService.updateApplicant(id, { status: action });
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
    submitActionsToApplicants(formValues) {
        console.log('status update', formValues);
        const id = formValues[0].applicantId;
        const action = formValues[0].actions;
        // const id = this.actionsFrom.controls.applicantId.value;
        this.isSubmitted = true;
        this.dbHelper.doc$(`applicant/${id}`).subscribe((data) => {
            this.applicantData = data;
            const applicant = this.applicantData.name;
            const phoneNumber = this.applicantData.phoneNumber;
            const positionId = this.positionId;
            if (action === 'scheduleInterview') {
                const calendarLink = JSON.parse(localStorage.getItem('appUserData')).calendarLink;
                this.smsService.requestInterview(applicant, positionId, phoneNumber, calendarLink).subscribe(resp => {
                    console.log('sent request to lambda', resp);
                });
            }
            if (action === "hireApplicant") {
                // route hiring manger to new hire page
                this.addNewHire(this.applicantData).then(data => {
                    console.log('display new hire modal');
                });
            }
            if (action === 'interviewCompleted') {
                // route to a notes/ applicant details
                this.applicantDetails(this.applicantData).then(data => {
                    console.log('applicant details');
                });
            }
        });
        this.applicantService.updateApplicant(id, { status: action });
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