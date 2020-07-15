import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MybooksPage } from './mybooks.page';

describe('MybooksPage', () => {
  let component: MybooksPage;
  let fixture: ComponentFixture<MybooksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MybooksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MybooksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
