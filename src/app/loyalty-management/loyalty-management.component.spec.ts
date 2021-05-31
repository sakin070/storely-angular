import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyManagementComponent } from './loyalty-management.component';

describe('LoyaltyManagementComponent', () => {
  let component: LoyaltyManagementComponent;
  let fixture: ComponentFixture<LoyaltyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyaltyManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
