import { __awaiter, __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { Applicant } from "../../shared/models/applicant";
import { RegisterApplicantComponent } from "../../shared-components/components/register-applicant/register-applicant.component";
let StoreInterviewPage = class StoreInterviewPage {
    constructor(fb, applicantService, authService, firestoreHelper, modalController, userService) {
        this.fb = fb;
        this.applicantService = applicantService;
        this.authService = authService;
        this.firestoreHelper = firestoreHelper;
        this.modalController = modalController;
        this.userService = userService;
        this.newApplicant = new Applicant();
        this.applicantData = [];
        this.formUrl = 'https://form.typeform.com/to/JEHf3wpl';
        this.displayColumns = ['fullName', 'phoneNumber', 'actions'];
    }
    ngOnInit() {
        this.isApplicantRegistered = false;
        console.log('incoming storeId', this.storeId);
        console.log('incoming franchiseId', this.franchiseId);
        // todo capture initial applicant information by registering in the system if not already a user, like name, contact information, possibly job applying for list open requisitions for hiring managers stores
        /**
         * Is applicant registered? Yes .. route to login. No? route to Register User Component
         *
         */
        // typeform sdk no worky for now
        // add back to constructor to use sdk = private renderer: Renderer2, private el: ElementRef
        /* this.interval = setInterval(() => {
           const widget = this.renderer.createElement('typeform-widget');
           widget.setAttribute('url', this.formUrl);
           this.renderer.appendChild(this.el.nativeElement, widget);
         }, 5000);*/
    }
    applicantIsNotRegistered() {
        return __awaiter(this, void 0, void 0, function* () {
            const storeId = this.storeId;
            // show registration modal In pouting user type / role, use phone number as initial password
            const registerApplicant = yield this.modalController.create({
                component: RegisterApplicantComponent,
                swipeToClose: true,
                componentProps: {
                    storeId
                }
            });
            return yield registerApplicant.present();
        });
    }
    applicantAlreadyRegistered() {
        this.applicantData = this.applicantService.getApplicantsByStore(this.storeId);
        console.log('list of applicants', this.applicantData);
        // show list of applicants registered and scheduled for interview for that particular store
    }
};
__decorate([
    Input()
], StoreInterviewPage.prototype, "franchiseId", void 0);
__decorate([
    Input()
], StoreInterviewPage.prototype, "storeId", void 0);
StoreInterviewPage = __decorate([
    Component({
        selector: 'app-store-interview',
        templateUrl: './store-interview.page.html',
        styleUrls: ['./store-interview.page.scss'],
    })
], StoreInterviewPage);
export { StoreInterviewPage };
//# sourceMappingURL=store-interview.page.js.map