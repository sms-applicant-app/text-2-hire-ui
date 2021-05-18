import { Injectable } from '@angular/core';
import {FirestoreHelperService} from "../firestore-helper.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public dbHelper: FirestoreHelperService
  ) { }

}
