import firebase from 'firebase';


export class JobPosting {
  recNumber: string;
  storeId: string;
  jobTitle: string;
  shortJobDescription: string;
  jobDescription: string;
  numberOfOpenSlots: string;
  addressId: string;
  jobType: string; // full time part time
  positionOpen: boolean;
  hiringManagerEmail: string;
  companyWebsite?: string;
  salary?: string;
  positionExpiration?: string;
  franchiseId: string;
  qualifications?: string;
  specialNotes?: string;
  benefits?: string;
  createdAt: firebase.firestore.FieldValue;
  onboardingPackageName?: string;
  onboardingPackageId?: string;

}
