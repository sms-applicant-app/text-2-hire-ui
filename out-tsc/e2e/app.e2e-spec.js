"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_po_1 = require("./app.po");
describe('new App', () => {
    let page;
    beforeEach(() => {
        page = new app_po_1.AppPage();
    });
    describe('default screen', () => {
        beforeEach(() => {
            page.navigateTo('/Inbox');
        });
        it('should say Inbox', () => {
            expect(page.getParagraphText()).toContain('Inbox');
        });
    });
});
//# sourceMappingURL=app.e2e-spec.js.map