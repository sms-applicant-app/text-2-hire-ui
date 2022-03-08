import {ApplicantStatus} from './applicant-status';
import { CustomForms } from './onBoardPacket';

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
  interviewNotes?: string;
  customForms?: Array<CustomForms>;
}
