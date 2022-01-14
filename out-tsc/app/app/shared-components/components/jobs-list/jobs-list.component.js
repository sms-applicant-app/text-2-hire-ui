import { __awaiter, __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { AddJobReqComponent } from "../add-job-req/add-job-req.component";
import { AddOnBoardPacketComponent } from "../add-on-board-packet/add-on-board-packet.component";
let JobsListComponent = class JobsListComponent {
    //todo action see applicant status update position, schedule interview
    constructor(uploadService, jobService, firestore, modalController, applicantService, dbHelper, route) {
        this.uploadService = uploadService;
        this.jobService = jobService;
        this.firestore = firestore;
        this.modalController = modalController;
        this.applicantService = applicantService;
        this.dbHelper = dbHelper;
        this.route = route;
        this.messageEvent = new EventEmitter();
        this.jobs = [];
        this.applicants = [];
        this.displayColumns = ['jobId', 'title', 'status', 'location', 'actions'];
    }
    ngOnInit() {
        this.viewApplicants = false;
        this.userData = JSON.parse(localStorage.getItem('appUserData'));
        //this.storeId = JSON.parse(localStorage.getItem('selectedStore'));
        console.log(' store Id from local storage', this.storeId);
        // if user role is hiring manager get jobs by storeId
        this.userRole = JSON.parse(localStorage.getItem('appUserData')).role;
        if (this.userRole === 'hiringManager') {
            this.getJobsByStoreId();
        }
        else {
            this.getJobsForFranchise(this.storeId);
        }
        this.sendJobsFranchiseIdMessage();
    }
    getJobsByFranchiseId() {
        this.firestore.collection('jobs', ref => ref.where('franchiseId', '==', this.franchiseId)).get()
            .subscribe(jobs => {
            this.jobs = [];
            if (jobs.docs.length === 0) {
                console.log('no docs with that franchise', this.franchiseId);
            }
            else {
                jobs.forEach(data => {
                    this.positionId = data.id;
                    const j = data.data();
                    this.jobs.push(j);
                    this.dataSource = new MatTableDataSource(this.jobs);
                });
            }
        });
    }
    getJobsForFranchise(storeId) {
        this.firestore.collection('jobs', ref => ref.where('storeId', '==', `${storeId}`)).get()
            .subscribe(jobs => {
            this.jobs = [];
            if (jobs.docs.length === 0) {
                console.log('no jobs with that store', this.storeId);
            }
            else {
                jobs.forEach(job => {
                    const j = job.data();
                    const positionId = job.id;
                    this.jobs.push({ id: positionId, position: j });
                    console.log(this.jobs, 'id', positionId);
                    this.dataSource = new MatTableDataSource(this.jobs);
                });
            }
        });
    }
    getJobsByStoreId() {
        this.jobService.currentData.subscribe(data => {
            console.log('data changed from local storage', data);
            const storeId = data;
            this.firestore.collection('jobs', ref => ref.where('storeId', '==', `${storeId}`)).get()
                .subscribe(jobs => {
                this.jobs = [];
                if (jobs.docs.length === 0) {
                    console.log('no jobs with that store', this.storeId);
                }
                else {
                    jobs.forEach(job => {
                        const j = job.data();
                        const positionId = job.id;
                        this.jobs.push({ id: positionId, position: j });
                        console.log(this.jobs, 'id', positionId);
                        this.dataSource = new MatTableDataSource(this.jobs);
                    });
                }
            });
        });
    }
    receiveNavigationMessage($event) {
        console.log('goBack', $event);
        this.viewApplicants = $event;
    }
    sendJobsFranchiseIdMessage() {
        this.messageEvent.emit(this.franchiseId);
    }
    addJobRec() {
        return __awaiter(this, void 0, void 0, function* () {
            const franchiseId = this.franchiseId;
            const storeId = localStorage.getItem('selectedStore');
            console.log('display add Job Model', storeId, franchiseId);
            const addJobRec = yield this.modalController.create({
                component: AddJobReqComponent,
                swipeToClose: true,
                componentProps: {
                    franchiseId,
                    storeId
                }
            });
            return yield addJobRec.present();
        });
    }
    newOnboardPage() {
        this.route.navigate(['store/onboarding']);
    }
    createOnboardingPacket() {
        return __awaiter(this, void 0, void 0, function* () {
            const franchiseId = this.franchiseId;
            const storeId = localStorage.getItem('selectedStore');
            console.log('display add Job Model', storeId, franchiseId);
            const createOnboardPackage = yield this.modalController.create({
                component: AddOnBoardPacketComponent,
                swipeToClose: true,
                componentProps: {
                    franchiseId,
                    storeId
                }
            });
            return yield createOnboardPackage.present();
        });
    }
    getApplicants(positionId) {
        this.viewApplicants = true;
        this.positionId = positionId;
        /*  this.firestore.collection('applicant', ref => ref.where('positionId', '==', `${positionId}`)).get()
            .subscribe(ss =>{
              this.applicants = [];
              if (ss.docs.length === 0){
                console.log('no applicants for position');
              } else {
               ss.forEach( applicant =>{
                 const a = applicant.data();
                 const id = applicant.id;
                 this.applicants.push({ id, applicant: a});
                 console.log('applicants applied', this.applicants);
               });
              }
            });*/
    }
    updatePosition(id) {
        console.log('Update a position rather that is change pay rate rec number available, move applicant manually');
    }
    scheduleInterview(id) {
        console.log('bring list of applicants for that position and select which applicant to schedule interview');
    }
};
__decorate([
    Input()
], JobsListComponent.prototype, "franchiseId", void 0);
__decorate([
    Input()
], JobsListComponent.prototype, "storeId", void 0);
__decorate([
    Output()
], JobsListComponent.prototype, "messageEvent", void 0);
JobsListComponent = __decorate([
    Component({
        selector: 'app-jobs-list',
        templateUrl: './jobs-list.component.html',
        styleUrls: ['./jobs-list.component.scss'],
    })
], JobsListComponent);
export { JobsListComponent };
//# sourceMappingURL=jobs-list.component.js.map