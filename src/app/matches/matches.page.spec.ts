import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchesPage } from './matches.page';

describe('MatchesPage', () => {
  let component: MatchesPage;
  let fixture: ComponentFixture<MatchesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatchesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
