import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { ROUTES_STR } from 'src/app/core/constants/app-constants';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  /**
   *
   * @param req
   * @param next
   * expected output from api : {message:"", data:[] | {} }
   */
  constructor(
    private toasterService: ToastService,
    private router: Router,
    private authService: AuthService,
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('called response interceptor', req);
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((err: any, caught) => {
        if (err instanceof HttpErrorResponse) {
          if (Math.floor(err.status / 100) === 4) {
            // handle 400 errors
            // todo load a toast here with err.message - received from server
            if (err.error.action === 'logout' || err.error.code === 'LOGGED_OUT') {
              setTimeout(() => {
                this.router.navigate([ROUTES_STR.login]);
              }, 1000);
            }
            if (err.status === 403) {
              //  Handling the GSTN API response
              // if (err.error.action === 'logout') {
              //    setTimeout(() => {
              //     this.router.navigate([ROUTES_STR.login]);
              //     this.authService.logOut();
              //   }, 1000);
              // }
              if (err && err.error.message) {
                this.toasterService.presentToast(err.error.message, 'toast-error');
              } else {
                this.toasterService.presentToast(err.error, 'toast-error');
              }
            } else if (err.status === 401) {
              //this.router.navigate([ROUTES_STR.login]);
              this.toasterService.presentToast(err.error.message, 'toast-error');
            }
            else {
              this.toasterService.presentToast(err.error.message, 'toast-error');
              console.log('err.error =', err.error, ';');
            }
          }
          if (Math.floor(err.status / 100) === 5) {
            console.log('err.error =', err.error, ';');
            const responseError = err.error;
            this.toasterService.presentToast(err.error.message, 'toast-error');
          }
          console.log(err);
          return throwError(err);
        }
      })
    );
  }
}
