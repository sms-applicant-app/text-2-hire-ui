import {User} from "./user";
import {Store} from "./store";

export class Franchisee extends User {
  franchiseId: string;
  franchiseOwnerId: string;
  businessLegalName: string;
  corporateEmail: string;
  corporatePhoneNumber: string;
  addressId: string;
  dateCreated: any;
  createdDate: any;
  jobTitle: string;
  userId: string;
  dba: string;
  store: Store[] = [];
}
