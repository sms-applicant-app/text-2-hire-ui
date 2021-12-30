import { __decorate } from "tslib";
import { Component } from '@angular/core';
let FolderPage = class FolderPage {
    constructor(activatedRoute) {
        this.activatedRoute = activatedRoute;
    }
    ngOnInit() {
        this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    }
};
FolderPage = __decorate([
    Component({
        selector: 'app-folder',
        templateUrl: './folder.page.html',
        styleUrls: ['./folder.page.scss'],
    })
], FolderPage);
export { FolderPage };
//# sourceMappingURL=folder.page.js.map