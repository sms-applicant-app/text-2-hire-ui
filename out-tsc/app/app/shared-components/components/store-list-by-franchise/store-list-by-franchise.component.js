import { __awaiter, __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AddJobReqComponent } from "../add-job-req/add-job-req.component";
let StoreListByFranchiseComponent = class StoreListByFranchiseComponent {
    constructor(dbHelper, firestore, userService, router, modalController) {
        this.dbHelper = dbHelper;
        this.firestore = firestore;
        this.userService = userService;
        this.router = router;
        this.modalController = modalController;
        this.storeData = [];
        this.store = [];
        this.displayColumns = ['storeName'];
        this.storeData = '';
        this.userId = JSON.parse(localStorage.getItem('user')).email;
    }
    ngOnInit() {
        console.log('need to add when selecting franchise to bring up stores for that franchise on admin', this.franchiseId);
        this.store = [];
        this.getListOfStoresBasedOnUser();
    }
    /* getListOfStoresByFranchise(){
       this.firestore.collection('store', ref => ref.where('franchiseId', '==', this.franchiseIdFromList)).get()
         .subscribe(stores =>{
           this.store = [];
           if (stores.docs.length === 0){
             console.log('no docs with that franchise', this.franchiseId);
           } else {
             stores.forEach(data =>{
               const s = data.data();
               this.storeData = data.data();
               this.store.push(s);
               console.log(this.store, 'stores' );
               this.dataSource = new MatTableDataSource<Store>(this.store);
               console.log(this.store.length, 'length', this.store);
             });
           }
         });
     }*/
    getListOfStoresBasedOnUser() {
        this.firestore.doc(`users/${this.userId}`).get().subscribe(doc => {
            this.userData = doc.data();
            // console.log('franchiseId in query', this.userData.franchiseId);
            this.firestore.collection('store', ref => ref.where('franchiseId', '==', this.userData.franchiseId)).get()
                .subscribe(stores => {
                this.store = [];
                if (stores.docs.length === 0) {
                    console.log('no docs with that franchise', this.franchiseId);
                }
                else {
                    stores.forEach(data => {
                        const s = data.data();
                        this.storeData = data.data();
                        this.store.push(s);
                        console.log(this.store, 'stores');
                        this.dataSource = new MatTableDataSource(this.store);
                        console.log(this.store.length, 'length', this.store);
                    });
                }
            });
        });
    }
    getFranchisee(franchiseId) {
        this.dbHelper.collectionWithIds$(`franchisee/${franchiseId}`).subscribe((data) => {
            console.log(data);
            this.franchiseData = data;
        });
    }
    getStoreDetails(id) {
        console.log('store details', id);
        this.router.navigate([`franchise/store-details/${id}`]);
    }
    addJodOpening(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const franchiseId = this.franchiseId;
            const storeId = id;
            console.log('display add job model');
            const addJobModel = yield this.modalController.create({
                component: AddJobReqComponent,
                swipeToClose: true,
                componentProps: {
                    // may need franchise id
                    franchiseId,
                    storeId
                }
            });
            return yield addJobModel.present();
        });
    }
};
__decorate([
    ViewChild(MatPaginator, { static: true })
], StoreListByFranchiseComponent.prototype, "paginator", void 0);
__decorate([
    ViewChild(MatSort, { static: true })
], StoreListByFranchiseComponent.prototype, "sort", void 0);
__decorate([
    ViewChild('input', { static: true })
], StoreListByFranchiseComponent.prototype, "filter", void 0);
__decorate([
    Input()
], StoreListByFranchiseComponent.prototype, "franchiseId", void 0);
__decorate([
    Input()
], StoreListByFranchiseComponent.prototype, "stores", void 0);
StoreListByFranchiseComponent = __decorate([
    Component({
        selector: 'app-store-list-by-franchise',
        templateUrl: './store-list-by-franchise.component.html',
        styleUrls: ['./store-list-by-franchise.component.scss'],
    })
], StoreListByFranchiseComponent);
export { StoreListByFranchiseComponent };
//# sourceMappingURL=store-list-by-franchise.component.js.map