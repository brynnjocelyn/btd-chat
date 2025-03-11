import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordRequestSentPage } from './reset-password-request-sent.page';

describe('ResetPasswordRequestSentPage', () => {
  let component: ResetPasswordRequestSentPage;
  let fixture: ComponentFixture<ResetPasswordRequestSentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordRequestSentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
