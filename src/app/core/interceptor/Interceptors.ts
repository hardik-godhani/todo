import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, finalize, retry } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';

import { Router } from '@angular/router';
import { ApiStatus } from '../enums/enums';
import { ToastService } from '../services/toast.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  req: any;
  next: any;
  constructor(
    private localStorageService: LocalStorageService,
    private toastService: ToastService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = req.headers;
    let data: any = this.localStorageService.getUser();
    if (data && data.token) {
      headers = headers.set('Authorization', 'Bearer ' + data.token);
    }
    const clonedRequest = req.clone({ headers });

    let showSpinner = true;
    if (showSpinner) {
      return next.handle(clonedRequest).pipe(
        retry(1),
        catchError((error) => {
          if (error.error.status == ApiStatus.UNAUTHORIZED) {
            this.localStorageService.logout();
            this.router.navigate(['/login']);
          }
          if (error instanceof HttpErrorResponse) {
            this.toastService.errorMsg(error);
          }

          return of(error.error);
        })
      );
    } else {
      return next.handle(clonedRequest).pipe(
        retry(1),
        catchError((error) => {
          if (error.error.status == ApiStatus.UNAUTHORIZED) {
            this.localStorageService.logout();
            this.router.navigate(['/login']);
          }
          if (error instanceof HttpErrorResponse) {
            this.toastService.errorMsg(error);
          }

          return of(error.error);
        })
      );
    }
  }
}
