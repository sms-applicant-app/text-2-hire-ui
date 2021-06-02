import {Role} from "./role";

export class User {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  dateCreated: string;
  role: Role;
}
