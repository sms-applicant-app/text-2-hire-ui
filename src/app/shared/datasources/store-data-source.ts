import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {FranchiseService} from "../services/franchise.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {StoreService} from "../services/store.service";
import {catchError, finalize} from "rxjs/operators";
import {Store} from "../models/store";


export class StoreDataSource extends DataSource<any> {
  private storeSubject = new BehaviorSubject<Store[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  constructor(private storeService: StoreService) {
    super();
  }
  loadStores(storeId: string, filter: string, sortDirection: string, pageIndex: number, pageSize: number){
    this.loadingSubject.next(true);
    this.storeService.findStores(storeId, filter, sortDirection,
      pageIndex, pageSize).pipe(
      catchError(()=> of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(data => this.storeSubject.next(data));
  }

  connect(): Observable<any[]> {
    return this.storeService.getStores();
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }
}
