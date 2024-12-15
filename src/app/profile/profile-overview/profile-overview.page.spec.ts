import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileOverviewPage } from './profile-overview.page';

describe('ProfileOverviewPage', () => {
  let component: ProfileOverviewPage;
  let fixture: ComponentFixture<ProfileOverviewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
