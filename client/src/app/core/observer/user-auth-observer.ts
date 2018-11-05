import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class UserAuthObserver {

  private subject = new Subject<boolean>();
  isAuthenticated = this.subject.asObservable();

  constructor() {}

  pushIsAuthenticated(isAuthenticated) {
    this.subject.next(isAuthenticated);
  }
}
