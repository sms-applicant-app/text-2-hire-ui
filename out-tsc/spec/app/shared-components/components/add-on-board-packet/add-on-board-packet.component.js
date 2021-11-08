import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AddOnBoardPacketComponent = class AddOnBoardPacketComponent {
    constructor(fb) {
        this.fb = fb;
        this.formNames = [];
    }
    ngOnInit() {
        this.storeId = JSON.parse(localStorage.getItem('appUserData')).storeIds;
        this.customForms = this.fb.group({
            onBoardingPackageName: this.fb.array([])
        });
        this.federalForms = this.fb.group({
            w4: [''],
            i9: [''],
            stateW4: ['']
        });
        this.addFormToPackage();
    }
    initiateOnboardPackage() {
        return this.fb.group({
            fileName: [],
        });
    }
    addFormToPackage() {
        const control = this.customForms.get('onBoardPackageName');
        return control.push((this.initiateOnboardPackage()));
    }
    get getFormControls() {
        const control = this.customForms.get('onBoardPackageName');
        return control;
    }
    formUploaded($event) {
        this.formNames = [];
        console.log('formsUploaded', $event);
        this.fileUpload = $event;
        if ($event) {
            console.log('do something with this form', this.fileUpload);
            this.formNames.push(this.fileUpload.name);
        }
    }
    uploadTask($event) {
        console.log('percentage complete', $event);
    }
    ngAfterOnInit() {
        console.log('after init');
        this.formsControl = this.customForms.get('onBoardPackageName');
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