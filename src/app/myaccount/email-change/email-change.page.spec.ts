import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmailChangePage } from './email-change.page';

describe('EmailChangePage', () => {
  let component: EmailChangePage;
  let fixture: ComponentFixture<EmailChangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailChangePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailChangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
