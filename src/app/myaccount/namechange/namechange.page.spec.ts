import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NamechangePage } from './namechange.page';

describe('NamechangePage', () => {
  let component: NamechangePage;
  let fixture: ComponentFixture<NamechangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamechangePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NamechangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
