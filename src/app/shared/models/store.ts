import {User} from './user';
import {Address} from './address';
import {StoreManager} from './store-manager';

export class Store {
  storeId: string;
  storeName: string;
  storePhoneNumber: string;
  storeHiringManager: StoreManager;
  addressId: string;
  franchiseId: string;
  address: Address;
  createdDate: string;
  updatedDate: string;

}
