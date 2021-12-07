import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
let OnboardingService = class OnboardingService {
    constructor(firestore) {
        this.firestore = firestore;
    }
    createOnboardPacket(packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const packetObj = Object.assign({}, packet);
            console.log('adding packet', packet);
            return this.firestore.collection('onboardPackages').add(packetObj).then(docRef => {
                const packetId = docRef.id;
                localStorage.setItem('added-packet', JSON.stringify(packetId));
            });
        });
    }
    getAllOnboardingPackagesByStoreId(storeId) {
        return this.firestore.collection('onboardPackages', ref => ref.where(`${storeId}`, '==', storeId)).get()
            .subscribe(ss => {
            if (ss.docs.length === 0) {
                console.log('no onboarding packets');
            }
            else {
                ss.docs.forEach(doc => {
                    this.onBoardingData = doc.data();
                });
            }
        });
    }
    updateOnboardPacket(packetId, data) {
        console.log('id', packetId, 'updated packet', data);
        this.firestore.doc(`onboardPackages/${packetId}`).update(data).then(resp => {
            console.log('updated packet', resp);
        });
    }
};
OnboardingService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], OnboardingService);
export { OnboardingService };
//# sourceMappingURL=onboarding.service.js.map