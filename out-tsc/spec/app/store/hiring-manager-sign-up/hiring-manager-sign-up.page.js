import { __decorate } from "tslib";
import { Component } from '@angular/core';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
let HiringManagerSignUpPage = class HiringManagerSignUpPage {
    constructor(authService) {
        this.authService = authService;
    }
    ngOnInit() {
        this.signUpWithGoogle();
    }
    // login sign up using google auth
    signUpWithGoogle() {
        const uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: (authResult, redirectUrl) => 
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                true,
                uiShown: () => {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '/store',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            // Privacy policy url.
            privacyPolicyUrl: '<your-privacy-policy-url>'
        };
        const ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', uiConfig);
    }
};
HiringManagerSignUpPage = __decorate([
    Component({
        selector: 'app-hiring-manager-sign-up',
        templateUrl: './hiring-manager-sign-up.page.html',
        styleUrls: ['./hiring-manager-sign-up.page.scss'],
    })
], HiringManagerSignUpPage);
export { HiringManagerSignUpPage };
//# sourceMappingURL=hiring-manager-sign-up.page.js.map