import {Role} from './role';

export class User {
  id: string;
  fullName: string;
  password: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  dateCreated: string;
  franchiseId: string;
  storeIds?: [];
  role: Role;
}
