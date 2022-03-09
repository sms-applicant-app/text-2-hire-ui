import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { toastMess } from '../constants/messages';
import {OnBoardPacket} from '../models/onBoardPacket';
import { AlertService } from './alert.service';
import {Observable} from 'rxjs';
import { FirestoreHelperService } from '../firestore-helper.service';
@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  onBoardingData: any;
  constructor(
    public firestore: AngularFirestore,
    public alertService: AlertService,
    public dbHelper: FirestoreHelperService
    ) { }

    async createOnboardPacket(packet: OnBoardPacket): Promise<any> {
      const packetId: string = this.firestore.createId();
      packet.customForms = packet.customForms.map((obj)=> { return Object.assign({}, obj)});
      return this.dbHelper.set(`onboardPackages/${packetId}`, packet).then(docRef =>{
        localStorage.setItem('added-packet', JSON.stringify(packetId));
        this.alertService.showSuccess(toastMess.CREATE_ONBOARD_SUCCESS);
        return {
          id: packetId,
          ...packet
        };
      }).catch((err) => {
        this.alertService.showError(toastMess.CREATE_ONBOARD_FAILED);
      });
  }

  getAllOnboardingPackagesByStoreId(storeId): Observable<any>{
    return this.firestore.collection('onboardPackages', ref => ref.where('storeId', '==', storeId)).get();
  }
  updateOnboardPacket(packetId, data) {
    this.firestore.doc(`onboardPackages/${packetId}`).update(data).then(resp => {
      console.log('updated packet', resp);
    });
  }
}
