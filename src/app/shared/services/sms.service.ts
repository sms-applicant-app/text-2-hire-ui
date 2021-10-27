import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class SmsService {
  requestInterviewEndPoint = 'https://m0dwmc1b67.execute-api.us-east-1.amazonaws.com/dev/api/requestInterview';
  sendOnboardingLinksEndPoint = 'https://m0dwmc1b67.execute-api.us-east-1.amazonaws.com/dev/api/sendOnboardingForms'
  constructor(private http: HttpClient) { }

  requestInterview(name, positionId, clientPhoneNumber, calendarLink){
    const data ={
      name,
      positionId,
      clientPhoneNumber,
      calendarLink
    };
    const dataObj = {...data};
    const obj = JSON.stringify(data);

    return this.http.post(`${this.requestInterviewEndPoint}`, obj, httpOptions);
  }
  sendNewHireForms(action, name, applicantPhone, linkToOnboardingForms, franchiseName, hiringManagersName, storePhone, startDate){
    const data = {
      name,
      applicantPhone,
      linkToOnboardingForms,
      franchiseName,
      hiringManagersName,
      storePhone,
      startDate,
      action
    }
    const obj = JSON.stringify(data);
    return this.http.post(`${this.sendOnboardingLinksEndPoint}`, obj, httpOptions);
  }
}

