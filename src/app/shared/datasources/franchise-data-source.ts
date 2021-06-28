import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Franchisee} from "../models/franchisee";
import {FirestoreHelperService} from "../firestore-helper.service";
import {FranchiseService} from "../services/franchise.service";
import {catchError, finalize} from "rxjs/operators";
import {Store} from "../models/store";

export class FranchiseDataSource extends DataSource<any> {

  private storeSubject = new BehaviorSubject<Store[]>([]);
  private franchiseSubject = new BehaviorSubject<Franchisee[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private franchiseService: FranchiseService) {
    super()
  }

  loadFranchises(franchiseId: string,
                 filter: string,
                 sortDirection: string,
                 pageIndex: number,
                 pageSize: number){
    this.loadingSubject.next(true)
    this.franchiseService.findFranchisesStores(franchiseId, filter, sortDirection,
      pageIndex, pageSize).pipe(
        catchError(()=> of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(data => this.franchiseSubject.next(data))
  }
  connect(): Observable<any[]>{
    return this.franchiseService.getFranchises()
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.storeSubject.complete();
    this.loadingSubject.complete();
  }
}
