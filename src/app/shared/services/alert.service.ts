import { Router } from '@angular/router';
import { HostListener, Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AlertInfo} from '../models/alert-info';
import {filter} from 'rxjs/operators';
import {Alert, AlertType} from '../models/alert.model';
import { AlertController  } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';

const TIME_SHOW_ALERT = 4000;
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';
  constructor(
    public router: Router,
    private toastr: ToastrService,
    public alertController: AlertController
    ) {}
  // new alert service
  showSuccess(message: string, title?: any) {
    this.toastr.success(message, title, {
      timeOut: TIME_SHOW_ALERT,
      positionClass: 'toast-top-right'
    });
  }
  showInfo(message: string, title?: any) {
    this.toastr.info(message, title, {
      timeOut: TIME_SHOW_ALERT,
      positionClass: 'toast-top-right'
    });
  }
  showWarning(message: string, title?: any) {
    this.toastr.warning(message, title, {
      timeOut: TIME_SHOW_ALERT,
      positionClass: 'toast-top-right'
    });
  }
  showError(message: string, title?: any) {
    this.toastr.error(message, title, {
      timeOut: TIME_SHOW_ALERT,
      positionClass: 'toast-top-right'
    });
  }
  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }
  // convenience methods
  success(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Success, message }));
  }

  error(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Error, message }));
  }

  info(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Info, message }));
  }

  warn(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
  }

  // main alert method
  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }

  async alertConfirm(alertTitle) {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: 'Confirm',
        message: `Do you want to delete this <strong>${alertTitle}</strong>!!!`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: '',
            handler: (e) => {
              resolve(false);
            }
          }, {
            text: 'Ok',
            cssClass: 'btn btn-danger',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });

      await alert.present();
    });
  }

  async confirmChangeStatus(alertTitle) {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: 'Confirm',
        message: `Do you want to change the status of this <strong>${alertTitle}</strong>?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: '',
            handler: (e) => {
              resolve(false);
            }
          }, {
            text: 'Ok',
            cssClass: 'btn btn-danger',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });

      await alert.present();
    });
  }
}
