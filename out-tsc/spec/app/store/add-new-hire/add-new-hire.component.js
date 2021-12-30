import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
let AddNewHireComponent = class AddNewHireComponent {
    constructor(dbHelper, storeService, smsService, onBoardingService, firestore, fb) {
        this.dbHelper = dbHelper;
        this.storeService = storeService;
        this.smsService = smsService;
        this.onBoardingService = onBoardingService;
        this.firestore = firestore;
        this.fb = fb;
        this.onBoardingPackages = [];
        this.formNames = [];
    }
    ngOnInit() {
        console.log('incoming applicant', this.applicant, 'incoming store', this.store);
        this.storeId = this.applicant.applicant.storeId;
        this.positionAppliedForId = this.applicant.positionId;
        //this.getListOfOnboardingPackages();
        this.getOnboardingPacketsByStoreId(this.storeId);
        this.customFormsAdded = false;
        this.customForms = this.fb.group({
            onBoardingPackageName: this.fb.array([])
        });
    }
    //get list of onboarding packages for store
    getListOfOnboardingPackages() {
        const storeId = this.storeId;
        this.onBoardingPackages = this.onBoardingService.getAllOnboardingPackagesByStoreId(storeId);
        /*
        this.onBoardingPackages.forEach(data =>{
          console.log('onbaording packages',data);
        });*/
        console.log(this.onBoardingPackages);
    }
    getOnboardingPacketsByStoreId(storeId) {
        this.firestore.collection('onboardPackages', ref => ref.where('storeId', '==', `${storeId}`)).get()
            .subscribe(ss => {
            this.onBoardingPackages = [];
            if (ss.docs.length === 0) {
                console.log('no onboarding Packages');
            }
            else {
                ss.forEach(a => {
                    const app = a.data();
                    const id = a.id;
                    this.onBoardingPackages.push({ id, packages: app });
                    this.dataSource = new MatTableDataSource(this.onBoardingPackages);
                });
                console.log(this.onBoardingPackages);
            }
        });
    }
    sendOnboardingLinkToApplicant(applicant) {
        const onBoadingUid = '1234567';
        console.log('applicant', applicant);
        this.smsService.sendNewHireForms(applicant.applicant.name, applicant.applicant.phoneNumber, onBoadingUid, 'Jimmy Johns', 'Brandon', '3145995164', '12/01/2021').subscribe(data => {
            console.log(data);
        });
    }
    selectionChange(e) {
        console.log('store step', e);
    }
    uploadTask($event) {
        console.log('percentage complete', $event);
        if ($event === 100) {
            /* this.addCustomForm = false;*/
            this.customFormsAdded = true;
        }
    }
    get getFormControls() {
        const control = this.customForms.get('onBoardingPackageName');
        return control;
    }
    formUploaded($event) {
        this.formNames = [];
        console.log('formsUploaded', $event);
        this.fileUpload = $event;
        if ($event) {
            console.log('do something with this form', this.fileUpload);
            this.formNames.push(this.fileUpload.file.name);
            console.log('uploaded forms', this.formNames);
            /* this.formNames.forEach(
               this.newCustomForms.formUrl = this.formNames.url
             );*/
        }
    }
};
__decorate([
    Input()
], AddNewHireComponent.prototype, "applicant", void 0);
__decorate([
    Input()
], AddNewHireComponent.prototype, "store", void 0);
AddNewHireComponent = __decorate([
    Component({
        selector: 'app-add-new-hire',
        templateUrl: './add-new-hire.component.html',
        styleUrls: ['./add-new-hire.component.scss'],
    })
], AddNewHireComponent);
export { AddNewHireComponent };
//# sourceMappingURL=add-new-hire.component.js.map