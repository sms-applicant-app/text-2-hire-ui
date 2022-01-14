import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CustomForms, OnBoardPacket } from "../../../shared/models/onBoardPacket";
let AddOnBoardPacketComponent = class AddOnBoardPacketComponent {
    constructor(fb, onBoardingService) {
        this.fb = fb;
        this.onBoardingService = onBoardingService;
        this.formNames = [];
        this.newOnboardPacket = new OnBoardPacket();
        this.newCustomForms = new CustomForms();
    }
    ngOnInit() {
        this.storeId = JSON.parse(localStorage.getItem('appUserData')).storeIds;
        this.customForms = this.fb.group({
            onBoardingPackageName: this.fb.array([])
        });
        this.federalForms = this.fb.group({
            name: [''],
            w4: [''],
            i9: [''],
            stateW4: ['']
        });
        this.addCustomForm = false;
        this.customFormsAdded = false;
        this.addFormRowToPackage();
    }
    ngAfterOnInit() {
        console.log('after init');
        this.formsControl = this.customForms.get('onBoardingPackageName');
    }
    initiateOnboardPackage() {
        return this.fb.group({
            fileName: [],
        });
    }
    addCustomFormButton() {
        this.addFormRowToPackage();
        this.addCustomForm = true;
    }
    addFormRowToPackage() {
        const control = this.customForms.get('onBoardingPackageName');
        return control.push((this.initiateOnboardPackage()));
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
    submitCustomForms() {
        const control = this.customForms.get('onBoardingPackageName');
        const forms = control.controls.filter(row => row).map(row => row.value);
        console.log('forms added', forms);
        this.newOnboardPacket.name = this.federalForms.controls.name.value;
        this.newOnboardPacket.i9 = this.federalForms.controls.i9.value;
        this.newOnboardPacket.stateW4 = this.federalForms.controls.stateW4.value;
        this.newOnboardPacket.w4 = this.federalForms.controls.w4.value;
        this.newOnboardPacket.customForms = this.fileUpload.file.name;
        this.newOnboardPacket.storeId = JSON.parse(localStorage.getItem('appUserData')).storeIds;
        this.createOnboadingPackage(this.newOnboardPacket);
    }
    uploadTask($event) {
        console.log('percentage complete', $event);
        if ($event === 100) {
            this.addCustomForm = false;
            this.customFormsAdded = true;
            // push to array of forms
        }
    }
    createOnboadingPackage(packet) {
        this.onBoardingService.createOnboardPacket(packet).then(data => {
            console.log('sent forms', packet);
        });
    }
};
AddOnBoardPacketComponent = __decorate([
    Component({
        selector: 'app-add-on-board-packet',
        templateUrl: './add-on-board-packet.component.html',
        styleUrls: ['./add-on-board-packet.component.scss'],
    })
], AddOnBoardPacketComponent);
export { AddOnBoardPacketComponent };
//# sourceMappingURL=add-on-board-packet.component.js.map