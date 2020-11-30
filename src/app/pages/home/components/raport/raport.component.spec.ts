import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RaportComponent } from './raport.component';

describe('RaportComponent', () => {
  let component: RaportComponent;
  let fixture: ComponentFixture<RaportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaportComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RaportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
