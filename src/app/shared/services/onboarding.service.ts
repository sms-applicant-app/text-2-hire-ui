import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {OnBoardPacket} from '../models/onBoardPacket';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  onBoardingData: any;
  constructor(public firestore: AngularFirestore) { }
  async createOnboardPacket(packet: OnBoardPacket): Promise<any>{
    const packetObj = {...packet};
    console.log('adding packet',packet);
    return this.firestore.collection('onboardPackages').add(packetObj).then(docRef =>{
      const packetId = docRef.id;
      localStorage.setItem('added-packet', JSON.stringify(packetId));
    });
  }
  getAllOnboardingPackagesByStoreId(storeId){
    return this.firestore.collection('onboardPackages', ref => ref.where(`${storeId}`, '==', storeId)).get()
      .subscribe(ss=>{
        if(ss.docs.length === 0){
          console.log('no onboarding packets');
        } else {
          ss.docs.forEach(doc =>{
            this.onBoardingData = doc.data();
          });
        }
      });
  }
  updateOnboardPacket(packetId, data) {
    console.log('id', packetId, 'updated packet', data);
    this.firestore.doc(`onboardPackages/${packetId}`).update(data).then(resp => {
      console.log('updated packet', resp);
    });
  }
}
