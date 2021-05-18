import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Franchises', url: '/franchise', icon: 'mail' },
    { title: 'Stores', url: '/folder/Outbox', icon: 'storefront' },
    { title: 'Add A Franchise', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Metrics', url: '/folder/Archived', icon: 'archive' },

  ];

  constructor() {}
}
