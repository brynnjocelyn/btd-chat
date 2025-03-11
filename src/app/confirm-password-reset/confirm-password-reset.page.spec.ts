import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmPasswordResetPage } from './confirm-password-reset.page';

describe('ConfirmPasswordResetPage', () => {
  let component: ConfirmPasswordResetPage;
  let fixture: ComponentFixture<ConfirmPasswordResetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPasswordResetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
