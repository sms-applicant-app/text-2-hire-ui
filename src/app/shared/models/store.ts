import {User} from './user';
import {Address} from './address';
import {StoreManager} from './store-manager';
import firebase from 'firebase';

export class Store {
  storeId: string;
  storeName: string;
  storePhoneNumber: string;
  storeHiringManager: StoreManager;
  addressId: string;
  franchiseId: string;
  address: Address;
  createdDate: firebase.firestore.FieldValue;
  updatedDate: string;

}
