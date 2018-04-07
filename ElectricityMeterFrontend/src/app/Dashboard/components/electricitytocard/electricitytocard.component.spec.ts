import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricitytocardComponent } from './electricitytocard.component';

describe('ElectricitytocardComponent', () => {
  let component: ElectricitytocardComponent;
  let fixture: ComponentFixture<ElectricitytocardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricitytocardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricitytocardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
