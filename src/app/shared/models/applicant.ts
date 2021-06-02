import {Address} from "./address";
import {User} from "./user";

export class Applicant extends User {
    applicantId: string;
    address: Address;
    jobId: string;
    dob: string;
    gender?: string;
}
