import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {UtilService} from "../services/util.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

  constructor(public utilService: UtilService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set('x-access-token', this.utilService.getAuthToken())
    });

    return next.handle(request);
  }
}
