import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectHeaderTitle } from 'src/app/shared/selectors/header.selectors';
import { setHeaderTitleAction } from 'src/app/shared/state/actions/header.actions';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor(private store: Store) {}

  // Store selectors
  getHeaderTitle(): Observable<string> {
    return this.store.select(selectHeaderTitle);
  }

  // Store actions
  setHeaderTitle(title: string) {
    this.store.dispatch(setHeaderTitleAction({ title }));
  }
}
