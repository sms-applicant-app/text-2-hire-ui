import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from "rxjs/operators";
import { Alert, AlertType } from "../models/alert.model";
let AlertService = class AlertService {
    constructor(router) {
        this.router = router;
        this.subject = new Subject();
        this.defaultId = 'default-alert';
    }
    // enable subscribing to alerts observable
    onAlert(id = this.defaultId) {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }
    // convenience methods
    success(message, options) {
        this.alert(new Alert(Object.assign(Object.assign({}, options), { type: AlertType.Success, message })));
    }
    error(message, options) {
        this.alert(new Alert(Object.assign(Object.assign({}, options), { type: AlertType.Error, message })));
    }
    info(message, options) {
        this.alert(new Alert(Object.assign(Object.assign({}, options), { type: AlertType.Info, message })));
    }
    warn(message, options) {
        this.alert(new Alert(Object.assign(Object.assign({}, options), { type: AlertType.Warning, message })));
    }
    // main alert method
    alert(alert) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }
    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }
    trigger(alertMessage, { status = '', details = '', seconds = 7 } = {}) {
        UIkit.notification.closeAll();
        let messageHTML;
        if (details) {
            messageHTML = '<figure class="complex"><span class="title">' + alertMessage + '</span>';
            messageHTML += '<span class="details">' + details + '</span>';
        }
        else {
            messageHTML = '<figure>' + alertMessage;
        }
        messageHTML += '</figure>';
        UIkit.notification(messageHTML, {
            pos: 'bottom-center',
            timeout: (seconds * 1000),
            status: status
        });
    }
};
AlertService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AlertService);
export { AlertService };
//# sourceMappingURL=alert.service.js.map