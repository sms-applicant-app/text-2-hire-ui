// This model is a job posting to be sent to API job board probably could be an Interface instead of class

export class JobListing {
  positionId: string;
  title: string;
  subTitle: string;
  location: string; // city
  shortDescription: string;
  dateCreated: string;
}
