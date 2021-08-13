import {ApplicantStatus} from './applicant-status';

export class Applicant {
  name: string;
  email: string;
  phoneNumber: string;
  applicantId: string;
  storeId: string;
  franchiseId: string;
  applicantStatus: ApplicantStatus;
  addressId?: string;
  jobId?: string;
  dob?: string;
  gender?: string;
}
