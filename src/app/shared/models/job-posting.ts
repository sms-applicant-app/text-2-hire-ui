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
  hiringManagerId: string;
  companyWebsite?: string;
  salary?: string;
  positionExpiration?: Date;
  franchiseId: string;
  qualifications?: string;
  specialNotes?: string;
  benefits?: string;
  createdAt: firebase.firestore.FieldValue;
  onboardingPackageName?: string;
  onboardingPackageId?: string;

}
