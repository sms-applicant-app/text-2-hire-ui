import {User} from "./user";
import {Store} from "./store";

export class Franchisee extends User {
  franchiseId: string;
  franchiseOwnerId: string;
  businessLegalName: string;
  corporateEmail: string;
  CorporatePhoneNumber: string;
  addressId: string;
  dateCreated: string;
  jobTitle: string;
  franchiseOwner: User;
  dba: string;
  store: Store[] = [];
}
