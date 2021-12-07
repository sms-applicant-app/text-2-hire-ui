import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { User } from '../shared/models/user';
import { DatePipe } from '@angular/common';
let LoginPage = class LoginPage {
    constructor(authService, fb, router, dbHelper, datePipe, userService) {
        this.authService = authService;
        this.fb = fb;
        this.router = router;
        this.dbHelper = dbHelper;
        this.datePipe = datePipe;
        this.userService = userService;
        this.newUser = new User();
        this.isRegisteringFranchiseUser = false;
        this.isRegisteringStore = false;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        this.validation_messages = {
            email: [
                { type: 'required', message: 'Enter your email to login' },
                { type: 'email', message: 'Must be a valid email' },
                // { type: 'maxlength', message: 'Display Name cannot be more than 25 characters long.' }
            ],
            name: [
                { type: 'required', message: 'Name is required.' },
                // { type: 'minlength', message: 'Display Name must be at least 4 characters long.' },
                // { type: 'maxlength', message: 'Display Name cannot be more than 25 characters long.' }
            ],
            phoneNumber: [
                { type: 'required', message: 'Phone Number is required.' },
                { type: 'minlength', message: 'Phone Number must be at least 7 characters long.' },
                { type: 'maxlength', message: 'Phone Number cannot be more than 15 characters long.' }
            ],
        };
        const navigation = this.router.getCurrentNavigation();
        const state = navigation.extras.state;
        if (state) {
            this.isRegisteringFranchiseUser = state.isRegisteringFranchise ? true : null;
        }
    }
    ngOnInit() {
        console.log('registering franchise', this.isRegisteringFranchiseUser);
        console.log('registering store', this.isRegisteringStore);
        this.acceptTerms = false;
        this.alreadyRegistered = false;
        this.registrationForm = this.fb.group({
            firstName: [''],
            lastName: [''],
            email: [''],
            password: [''],
            phoneNumber: ['']
        });
        this.firstTimeLogin = false;
    }
    createDate() {
        this.date = new Date();
        this.latestDate = this.datePipe.transform(this.date, 'MM-dd-yyyy');
        return this.latestDate;
    }
    gotoTerms() {
        console.log('go terms and conditions');
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authService.SignIn(email.value, password.value).then(user => {
                console.log('logged in user', user);
                const userRole = JSON.parse(localStorage.getItem('appUserData')).role;
                if (userRole) {
                    this.routeUserBasedOnRole(userRole);
                }
            });
        });
    }
    goToLogin() {
        this.alreadyRegistered = true;
    }
    registerUser(password) {
        console.log('password', password.value);
        this.createDate();
        this.newUser.email = this.registrationForm.controls.email.value;
        this.authService.RegisterUser(this.newUser.email, password.value).then(u => {
            console.log('registered user', u);
            this.userId = this.registrationForm.controls.email.value;
            const user = {
                firstName: this.registrationForm.controls.firstName.value,
                lastName: this.registrationForm.controls.lastName.value,
                email: this.registrationForm.controls.email.value,
                role: 'franchisee',
                phoneNumber: this.registrationForm.controls.phoneNumber.value,
                dateCreated: this.latestDate
            };
            this.firstTimeLogin = true;
            this.authService.SendVerificationMail();
            this.dbHelper.set(`users/${this.userId}`, user);
            this.authService.SignIn(this.newUser.email, password.value).then(resp => {
                this.routeUserBasedOnRole(this.userId);
            });
        });
    }
    routeUserBasedOnRole(userRole) {
        console.log('is first time login?', this.firstTimeLogin, 'user role', userRole);
        /*if (userRole === 'franchisee' && this.firstTimeLogin === true){
          this.router.navigate(['admin/admin-add-franchise']);
        }*/
        /*  if (userRole === 'franchisee' && this.firstTimeLogin !== true){
            const navigationExtras: NavigationExtras ={
              state: {
                userId: this.userId
              }
            };
            this.router.navigate(['franchise'], navigationExtras);
            console.log('Route Franchisee');
          }*/
        // combining user roles for franchise and hiring manager to minimize change management on the dashboard
        if (userRole === 'hiringManager' || userRole === 'franchise') {
            const navigationExtras = {
                state: {
                    userId: this.userId,
                    role: userRole
                }
            };
            this.router.navigate(['store'], navigationExtras);
        }
        if (userRole === 'admin') {
            this.router.navigate(['store']);
        }
    }
};
LoginPage = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.page.html',
        styleUrls: ['./login.page.scss'],
        providers: [DatePipe]
    })
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.page.js.map