import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShoeComponent } from './admin-shoe.component';

describe('AdminShoeComponent', () => {
  let component: AdminShoeComponent;
  let fixture: ComponentFixture<AdminShoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShoeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
