import { Router } from '@angular/router';
import { HostListener, Injectable } from '@angular/core';

declare var UIkit: any;

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public router: Router
    ) { }

  trigger(alertMessage: string, {status = '', details = '', seconds = 7}: {status?: string, details?: string, seconds?: number} = {}) {
    UIkit.notification.closeAll();

    let messageHTML: string;

    if (details) {
      messageHTML = '<figure class="complex"><span class="title">' + alertMessage + '</span>';
      messageHTML += '<span class="details">' + details + '</span>';
    } else {
      messageHTML = '<figure>' + alertMessage;
    }
    messageHTML += '</figure>';

    UIkit.notification(messageHTML, {
      pos: 'bottom-center',
      timeout: (seconds * 1000),
      status: status
    });
  }
}
