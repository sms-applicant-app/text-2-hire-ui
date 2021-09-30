import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddOnBoardPacketComponent } from './add-on-board-packet.component';

describe('AddOnBoardPacketComponent', () => {
  let component: AddOnBoardPacketComponent;
  let fixture: ComponentFixture<AddOnBoardPacketComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOnBoardPacketComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddOnBoardPacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
