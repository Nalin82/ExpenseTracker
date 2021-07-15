import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseWalletComponent } from './expense-wallet.component';

describe('ExpenseWalletComponent', () => {
  let component: ExpenseWalletComponent;
  let fixture: ComponentFixture<ExpenseWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
