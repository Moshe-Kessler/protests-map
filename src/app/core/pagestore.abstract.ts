import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

export abstract class PagestoreAbstract<T> {
  protected bs!: BehaviorSubject<T>;
  state$: Observable<T>;
  state: T;
  previous?: T;
  protected abstract pagestore: string;

  constructor(initialValue: Partial<T>) {
    this.bs = new BehaviorSubject<T>(initialValue as T);
    this.state$ = this.bs.asObservable();
    this.state = initialValue as T;
    this.state$.subscribe((s) => {
      this.state = s;
    });
  }

  patch(newValue: Partial<T>, event: string = 'Not specified'): void {
    this.previous = this.state;
    const newState = Object.assign({}, this.state, newValue);
    localStorage.setItem(this.pagestore, JSON.stringify(newState));
    if (!environment.production) {
      console.groupCollapsed(
        `[${this.pagestore} store] [patch] [event: ${event}]`
      );
      console.log('change', newValue);
      console.log('prev', this.previous);
      console.log('next', newState);
      console.groupEnd();
    }
    this.bs.next(newState);
  }
}
