import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { toastMess } from '../constants/messages';
import {OnBoardPacket} from '../models/onBoardPacket';
import { AlertService } from './alert.service';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  onBoardingData: any;
  constructor(
    public firestore: AngularFirestore,
    public alertService: AlertService
    ) { }
  async createOnboardPacket(packet: OnBoardPacket): Promise<any>{
    const packetObj = {...packet};
    return this.firestore.collection('onboardPackages').add(packetObj).then(docRef =>{
      const packetId = docRef.id;
      localStorage.setItem('added-packet', JSON.stringify(packetId));
      this.alertService.showSuccess(toastMess.CREATE_ONBOARD_SUCCESS);
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
