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
        this.lambdaSmsService = 'https://m0dwmc1b67.execute-api.us-east-1.amazonaws.com/dev/api/requestInterview';
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
        console.log('sending request to ', this.lambdaSmsService, data, obj, dataObj);
        return this.http.post(`${this.lambdaSmsService}`, obj, httpOptions);
    }
};
SmsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SmsService);
export { SmsService };
//# sourceMappingURL=sms.service.js.map