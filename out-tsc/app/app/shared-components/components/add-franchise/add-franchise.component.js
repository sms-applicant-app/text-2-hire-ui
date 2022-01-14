import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from "@angular/forms";
import { Franchisee } from "../../../shared/models/franchisee";
import { v4 as uuidv4 } from 'uuid';
let AddFranchiseComponent = class AddFranchiseComponent {
    constructor(dbHelper, datePipe, fb, router, franchiseService, dialog) {
        this.dbHelper = dbHelper;
        this.datePipe = datePipe;
        this.fb = fb;
        this.router = router;
        this.franchiseService = franchiseService;
        this.dialog = dialog;
        this.loading = false;
        this.submitted = false;
        this.newFranchise = new Franchisee();
        this.franchiseAdded = false;
    }
    ngOnInit() {
        this.userData = JSON.parse(localStorage.getItem('user'));
        this.isRegisteringStoreUser = false;
        this.initAddFranchiseForm();
        this.addAddress = false;
        this.addressAdded = false;
        this.addedFranchiseOwner = false;
        this.showFranchiseDetails = false;
    }
    createDate() {
        this.date = new Date();
        this.latestDate = this.datePipe.transform(this.date, 'MM-dd-yyyy');
        return this.latestDate;
    }
    initAddFranchiseForm() {
        this.addFranchiseForm = this.fb.group({
            legalBusinessName: ['', Validators.required],
            corporateEmail: [''],
            dba: [''],
            corporatePhone: ['']
        });
    }
    receiveUserMessage($event) {
        this.addedFranchiseOwner = $event;
        console.log('user added', this.addedFranchiseOwner);
        if (this.addedFranchiseOwner) {
            this.showFranchiseDetails = true;
        }
    }
    receiveAddressMessage($event) {
        this.addressAdded = $event;
        console.log('address added', this.addressAdded);
        if (this.addressAdded) {
            this.goToFranchiseList();
        }
    }
    addFranchise() {
        return __awaiter(this, void 0, void 0, function* () {
            this.createDate();
            this.newFranchise.businessLegalName = this.addFranchiseForm.controls.legalBusinessName.value;
            this.newFranchise.corporateEmail = this.addFranchiseForm.controls.corporateEmail.value;
            // this.newFranchise.jobTitle = this.addFranchiseForm.controls.jobTitle.value;
            this.newFranchise.dba = this.addFranchiseForm.controls.dba.value;
            this.newFranchise.phoneNumber = this.addFranchiseForm.controls.corporatePhone.value;
            this.newFranchise.addressId = this.addressId;
            this.newFranchise.franchiseOwnerId = this.userData.email;
            this.newFranchise.dateCreated = this.latestDate;
            const newFranchise = yield this.franchiseService.createFranchise(this.newFranchise);
            this.franchiseAdded = true;
            this.newFranchise.id = JSON.parse(localStorage.getItem('added-franchise'));
            console.log('new franchise id=', this.newFranchise.id);
            return this.newFranchise.id;
        });
    }
    addFranchiseAddress() {
        this.addressId = uuidv4();
        this.addAddress = true;
        this.addressType = 'franchise';
        this.addFranchise().then(franchiseId => {
            console.log('franchise added in address method ', franchiseId);
        });
    }
    goToFranchiseList() {
        const userRole = JSON.parse(localStorage.getItem('appUserData')).role;
        if (userRole === 'franchisee') {
            this.router.navigate(['franchise/list-stores']);
        }
        this.router.navigate(['admin/admin-franchise-list']);
    }
};
AddFranchiseComponent = __decorate([
    Component({
        selector: 'app-add-franchise',
        templateUrl: './add-franchise.component.html',
        styleUrls: ['./add-franchise.component.scss'],
    })
], AddFranchiseComponent);
export { AddFranchiseComponent };
//# sourceMappingURL=add-franchise.component.js.map