import {Address} from "./address";
import {User} from "./user";
import {Store} from "./store";

export class Franchisee {
  legalName: string;
  contactEmail: string;
  phoneNumber: string;
  address: Address;
  pointOfContact?: User;
  dateCreated: string;
  jobTitle: string;
  store: Store[] = []
}
