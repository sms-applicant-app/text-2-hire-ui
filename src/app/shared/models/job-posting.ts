import {Address} from "./address";

export class JobPosting {
  positionId: string;
  storeId: string;
  jobTitle: string;
  jobDescription: string;
  recNumber: string;
  address: Address;
  jobType: string; // full time part time
  companyWebsite: string;
  salary: string;
  dateCreated: string;
  positionExpiration: string;
}
