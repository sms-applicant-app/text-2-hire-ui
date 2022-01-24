import {User} from './user';
import {Address} from './address';
import {StoreManager} from './store-manager';
import firebase from 'firebase';

export class Store {
  storeId: number;
  storeName: string;
  storePhoneNumber: string;
  storeHiringManager: number;
  addressId: string;
  franchiseId: string;
  address: Address;
  createdDate: firebase.firestore.FieldValue;
  updatedDate: string;

}
