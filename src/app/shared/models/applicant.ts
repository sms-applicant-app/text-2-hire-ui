import {ApplicantStatus} from './applicant-status';

export class Applicant {
  name: string;
  email: string;
  phoneNumber: string;
  applicantId: string;
  storeId: string;
  franchiseId: string;
  status: ApplicantStatus;
  addressId?: string;
  jobId?: string;
  jobTitle?: string;
  dob?: string;
  gender?: string;
}
