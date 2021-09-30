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
  lambdaSmsService = 'https://m0dwmc1b67.execute-api.us-east-1.amazonaws.com/dev/api/requestInterview';
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
    console.log('sending request to ', this.lambdaSmsService, data, obj, dataObj);
    return this.http.post(`${this.lambdaSmsService}`, obj, httpOptions);
  }
}

