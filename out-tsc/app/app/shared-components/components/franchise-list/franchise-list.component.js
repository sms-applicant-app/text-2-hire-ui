import { __awaiter, __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { Franchisee } from '../../../shared/models/franchisee';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { AddStoreComponent } from '../add-store/add-store.component';
let FranchiseListComponent = class FranchiseListComponent {
    constructor(modalController, franchiseService, dbHelper, router, authService, userService, storeService) {
        this.modalController = modalController;
        this.franchiseService = franchiseService;
        this.dbHelper = dbHelper;
        this.router = router;
        this.authService = authService;
        this.userService = userService;
        this.storeService = storeService;
        this.franchiseData = [];
        this.storeData = [];
        this.selectedFranchise = new Franchisee();
        this.displayColumns = ['businessLegalName', 'dateCreated', 'phoneNumber', 'corporateEmail', 'dba', 'actions'];
        this.dbHelper.collectionWithIds$('franchisee').subscribe(data => {
            this.franchiseData = data;
            console.log(this.franchiseData);
            this.dataSource = new MatTableDataSource(this.franchiseData);
            setTimeout(() => {
                this.dataSource.paginator = this.paginator;
            }, 0);
        });
    }
    ngOnInit() {
        this.getFranchisee();
        this.displayRegistrationForm = false;
    }
    getFranchisee() {
        this.franchisees = [];
        this.dbHelper.collectionWithIds$('franchisee').subscribe((data) => {
            console.log(data);
            this.franchisees = data;
        });
    }
    addUserToFranchise(franchiseId) {
        return __awaiter(this, void 0, void 0, function* () {
            // show email password and role to register
            this.displayRegistrationForm = true;
            console.log(franchiseId);
            const userModal = yield this.modalController.create({
                component: RegisterUserComponent,
                swipeToClose: true,
                componentProps: {
                    franchiseId
                }
            });
            return yield userModal.present();
        });
    }
    export() {
    }
    getFranchiseDetails(franchiseId) {
        //show stores card with list of jobs 2 cards one with users, stores
        this.router.navigate([`/admin/admin-franchise-details/${franchiseId}`]);
    }
    addStoreToFranchise(franchiseId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('display add store', franchiseId);
            const storeIsAddedByAdmin = true;
            const addStoreModel = yield this.modalController.create({
                component: AddStoreComponent,
                swipeToClose: true,
                componentProps: {
                    franchiseId,
                    storeIsAddedByAdmin
                }
            });
            return yield addStoreModel.present();
        });
    }
};
__decorate([
    ViewChild(MatPaginator, { static: true })
], FranchiseListComponent.prototype, "paginator", void 0);
__decorate([
    ViewChild(MatSort, { static: true })
], FranchiseListComponent.prototype, "sort", void 0);
__decorate([
    ViewChild('input', { static: true })
], FranchiseListComponent.prototype, "filter", void 0);
__decorate([
    Input()
], FranchiseListComponent.prototype, "franchisee", void 0);
FranchiseListComponent = __decorate([
    Component({
        selector: 'app-franchise-list',
        templateUrl: './franchise-list.component.html',
        styleUrls: ['./franchise-list.component.scss'],
    })
], FranchiseListComponent);
export { FranchiseListComponent };
//# sourceMappingURL=franchise-list.component.js.map