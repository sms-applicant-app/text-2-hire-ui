import firebase from 'firebase';

export class Store {
  storeId: string;
  storeName: string;
  storePhoneNumber: string;
  storeHiringEmail: string;
  hiringManagersName: string;
  addressId: string;
  franchiseId: string;
  createdDate: firebase.firestore.FieldValue;
  updatedDate: firebase.firestore.FieldValue;
}
