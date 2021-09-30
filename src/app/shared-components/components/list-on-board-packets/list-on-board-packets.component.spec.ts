import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListOnBoardPacketsComponent } from './list-on-board-packets.component';

describe('ListOnBoardPacketsComponent', () => {
  let component: ListOnBoardPacketsComponent;
  let fixture: ComponentFixture<ListOnBoardPacketsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOnBoardPacketsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListOnBoardPacketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
