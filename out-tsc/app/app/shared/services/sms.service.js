import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
let SmsService = class SmsService {
    constructor(http) {
        this.http = http;
        this.requestInterviewEndPoint = 'https://m0dwmc1b67.execute-api.us-east-1.amazonaws.com/dev/api/requestInterview';
        this.sendOnboardingLinksEndPoint = 'https://m0dwmc1b67.execute-api.us-east-1.amazonaws.com/dev/api/sendOnboardingForms';
    }
    requestInterview(name, positionId, clientPhoneNumber, calendarLink) {
        const data = {
            name,
            positionId,
            clientPhoneNumber,
            calendarLink
        };
        const dataObj = Object.assign({}, data);
        const obj = JSON.stringify(data);
        return this.http.post(`${this.requestInterviewEndPoint}`, obj, httpOptions);
    }
    sendNewHireForms(action, name, applicantPhone, linkToOnboardingForms, franchiseName, hiringManagersName, storePhone, startDate) {
        const data = {
            name,
            applicantPhone,
            linkToOnboardingForms,
            franchiseName,
            hiringManagersName,
            storePhone,
            startDate,
            action
        };
        const obj = JSON.stringify(data);
        return this.http.post(`${this.sendOnboardingLinksEndPoint}`, obj, httpOptions);
    }
};
SmsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SmsService);
export { SmsService };
//# sourceMappingURL=sms.service.js.map