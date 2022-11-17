import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateRateComponent } from './dialog-update-rate.component';

describe('DialogUpdateRateComponent', () => {
  let component: DialogUpdateRateComponent;
  let fixture: ComponentFixture<DialogUpdateRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUpdateRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
