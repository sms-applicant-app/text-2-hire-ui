import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { JobPosting } from "../../../shared/models/job-posting";
let AddJobReqComponent = class AddJobReqComponent {
    constructor(fb, firestore, dbHelper, jobService, modalController, alertService, onboardingService) {
        this.fb = fb;
        this.firestore = firestore;
        this.dbHelper = dbHelper;
        this.jobService = jobService;
        this.modalController = modalController;
        this.alertService = alertService;
        this.onboardingService = onboardingService;
        this.newJobListing = new JobPosting();
        this.jobsData = [];
        this.onboardingPackagesData = [];
    }
    ngOnInit() {
        this.initAddJobForm();
        this.initJobsDetailsForm();
        this.getOnboardingPackages();
        this.userId = JSON.parse(localStorage.getItem('user')).email;
        this.firestore.doc(`users/${this.userId}`).get().subscribe(doc => {
            this.userData = doc.data();
            this.franchiseId = this.userData.franchiseId;
        });
    }
    initAddJobForm() {
        this.addJoblistingFrom = this.fb.group({
            recNumber: ['', Validators.required],
            jobTitle: ['', Validators.required],
            location: ['', Validators.required],
            jobType: [''],
            onboardingPackage: [''],
            numberOfOpenSlots: ['', Validators.required],
            shortDescription: [''],
            positionExpiration: ['', Validators.required],
            companyWebsite: [''],
            salary: ['', Validators.required]
        });
    }
    initJobsDetailsForm() {
        this.jobDetailsFrom = this.fb.group({
            fullDescription: [''],
            benefits: [''],
            specialNotes: [''],
            qualifications: ['']
        });
    }
    getOnboardingPackages() {
        const storeId = this.storeId;
        this.onboardingService.getAllOnboardingPackagesByStoreId(storeId).subscribe((res) => {
            this.onboardingPackagesData = [];
            if (res.docs.length === 0) {
                console.log('no docs with that franchise', this.franchiseId);
            }
            else {
                this.onboardingPackagesData = res.docs.map((data) => {
                    console.log('data.id', data.id);
                    return data.data();
                });
            }
        });
    }
    showJobList() {
        this.newJobListing.storeId = JSON.parse(localStorage.getItem('appUserData')).storeIds;
        this.jobsData = this.jobService.getJobsByStore(this.storeId);
        this.jobsData.forEach(job => {
            console.log('returned jobs', job);
        });
    }
    refreshPage() {
        //TODO clear form controls and go back to step one
    }
    addJobListing(stepper) {
        this.newJobListing.recNumber = this.addJoblistingFrom.controls.recNumber.value;
        this.newJobListing.jobDescription = this.jobDetailsFrom.controls.fullDescription.value;
        this.newJobListing.jobTitle = this.addJoblistingFrom.controls.jobTitle.value;
        this.newJobListing.addressId = this.addJoblistingFrom.controls.location.value;
        this.newJobListing.companyWebsite = this.addJoblistingFrom.controls.companyWebsite.value;
        this.newJobListing.salary = this.addJoblistingFrom.controls.salary.value;
        this.newJobListing.jobType = this.addJoblistingFrom.controls.jobType.value;
        this.newJobListing.positionOpen = true;
        this.newJobListing.hiringManagerId = JSON.parse(localStorage.getItem('user')).email;
        this.newJobListing.benefits = this.jobDetailsFrom.controls.benefits.value;
        this.newJobListing.specialNotes = this.jobDetailsFrom.controls.specialNotes.value;
        this.newJobListing.qualifications = this.jobDetailsFrom.controls.qualifications.value;
        this.newJobListing.numberOfOpenSlots = this.addJoblistingFrom.controls.numberOfOpenSlots.value;
        this.newJobListing.shortJobDescription = this.addJoblistingFrom.controls.shortDescription.value;
        this.newJobListing.positionExpiration = this.addJoblistingFrom.controls.positionExpiration.value;
        this.newJobListing.storeId = this.storeId;
        this.newJobListing.franchiseId = this.franchiseId;
        this.newJobListing.onboardingPackageName = this.addJoblistingFrom.controls.onboardingPackage.value;
        if (this.addJoblistingFrom.valid && this.jobDetailsFrom.valid) {
            this.jobService.addJobRec(this.newJobListing);
            stepper.next();
        }
        else if (this.addJoblistingFrom.invalid || this.jobDetailsFrom.invalid) {
            this.alertService.showError('Please enter field is required');
        }
    }
    closeModal() {
        this.modalController
            .dismiss()
            .then();
    }
    selectionChange(event) {
    }
};
__decorate([
    Input()
], AddJobReqComponent.prototype, "storeId", void 0);
AddJobReqComponent = __decorate([
    Component({
        selector: 'app-add-job-req',
        templateUrl: './add-job-req.component.html',
        styleUrls: ['./add-job-req.component.scss'],
    })
], AddJobReqComponent);
export { AddJobReqComponent };
//# sourceMappingURL=add-job-req.component.js.map