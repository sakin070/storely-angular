import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStockPurchasesComponent } from './view-stock-purchases.component';

describe('ViewStockPurchasesComponent', () => {
  let component: ViewStockPurchasesComponent;
  let fixture: ComponentFixture<ViewStockPurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStockPurchasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStockPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
