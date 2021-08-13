import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, of} from "rxjs";

import {FirestoreHelperService} from "../firestore-helper.service";
import {FranchiseService} from "../services/franchise.service";
import {catchError, finalize} from "rxjs/operators";
import {User} from '../models/user';
import {UserService} from "../services/user.service";


export class UserDataSource extends DataSource<any> {


  private userSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private userService: UserService ) {
    super();
  }

  /*loadFranchises(userId: string,
                 filter: string,
                 sortDirection: string,
                 pageIndex: number,
                 pageSize: number){
    this.loadingSubject.next(true);
    this.userService.findUsersByRole(userId, filter, sortDirection,
      pageIndex, pageSize).pipe(
        catchError(()=> of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(data => this.userSubject.next(data));
  }
  connect(): Observable<any[]>{
    return this.userService.getFranchises();
  }*/
  connectUsers(): Observable<any[]>{
    return this.userService.getUsers();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.userSubject.complete();
    this.loadingSubject.complete();
  }
}
