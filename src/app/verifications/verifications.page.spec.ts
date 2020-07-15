import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerificationsPage } from './verifications.page';

describe('VerificationsPage', () => {
  let component: VerificationsPage;
  let fixture: ComponentFixture<VerificationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
