import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../shared/models/user';
import { DatePipe } from '@angular/common';
import { Validators } from '@angular/forms';
import { Role } from '../../../shared/models/role';
import { toastMess } from '../../../shared/constants/messages';
import { emailValidator, phoneValidator } from '../../../shared/utils/app-validators';
let RegisterUserComponent = class RegisterUserComponent {
    constructor(datePipe, fb, authService, dbHelper, alertService) {
        this.datePipe = datePipe;
        this.fb = fb;
        this.authService = authService;
        this.dbHelper = dbHelper;
        this.alertService = alertService;
        this.addedUserEvent = new EventEmitter();
        this.newUser = new User();
        this.eRole = Role;
    }
    ngOnInit() {
        console.log('incoming franchise Id and or storeId', this.franchiseId, this.storeId);
        this.userAdded = false;
        this.isRegisteringStoreManager = false;
        this.userForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, emailValidator])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
        this.registrationForm = this.fb.group({
            fullName: ['', Validators.required],
            phoneNumber: ['', Validators.compose([Validators.required, phoneValidator])],
            role: ['']
        });
        if (this.storeId !== undefined) {
            this.isRegisteringStoreManager = true;
        }
    }
    createDate() {
        this.date = new Date();
        this.latestDate = this.datePipe.transform(this.date, 'MM-dd-yyyy');
        return this.latestDate;
    }
    registerStoreManagerUser() {
        this.createDate();
        this.newUser.email = this.userForm.controls.email.value;
        const password = this.userForm.controls.password.value;
        this.userId = this.newUser.email;
        this.authService.RegisterUser(this.newUser.email, password).then(u => {
            this.newUser.fullName = this.registrationForm.controls.fullName.value;
            this.newUser.email = this.userForm.controls.email.value;
            this.newUser.phoneNumber = this.registrationForm.controls.phoneNumber.value;
            this.newUser.role = this.registrationForm.controls.role.value;
            this.newUser.dateCreated = this.latestDate;
            this.newUser.franchiseId = this.franchiseId;
            this.newUser.storeIds = this.isRegisteringStoreManager ? this.storeId : null;
            this.dbHelper.set(`users/${this.userId}`, this.newUser);
            this.alertService.showSuccess(toastMess.CREATE_SUCCESS);
            this.authService.SendVerificationMail();
            this.userAdded = true;
            this.sendUserMessage();
        }).catch((err) => {
            this.alertService.showError(toastMess.CREATE_FAILED);
        });
    }
    registerFranchiseOwner() {
        this.createDate();
        this.newUser.email = this.userForm.controls.email.value;
        const password = this.userForm.controls.password.value;
        this.authService.RegisterUser(this.newUser.email, password).then(u => {
            console.log('registered user', u);
            const user = {
                firstName: this.registrationForm.controls.firstName.value,
                lastName: this.registrationForm.controls.lastName.value,
                email: this.userForm.controls.email.value,
                role: this.registrationForm.controls.role.value,
                phoneNumber: this.registrationForm.controls.phoneNumber.value,
                dateCreated: this.latestDate
            };
            this.dbHelper.set(`users/${this.userId}`, user);
            this.authService.SendVerificationMail();
            this.userAdded = true;
        });
    }
    sendUserMessage() {
        console.log('message being sent', this.newUser);
        this.addedUserEvent.emit(this.newUser);
    }
};
__decorate([
    Input()
], RegisterUserComponent.prototype, "franchiseId", void 0);
__decorate([
    Input()
], RegisterUserComponent.prototype, "storeId", void 0);
__decorate([
    Output()
], RegisterUserComponent.prototype, "addedUserEvent", void 0);
RegisterUserComponent = __decorate([
    Component({
        selector: 'app-register-user',
        templateUrl: './register-user.component.html',
        styleUrls: ['./register-user.component.scss'],
        providers: [DatePipe]
    })
], RegisterUserComponent);
export { RegisterUserComponent };
//# sourceMappingURL=register-user.component.js.map