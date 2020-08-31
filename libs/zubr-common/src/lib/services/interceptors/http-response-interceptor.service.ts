import {
  HttpErrorResponse, HttpEvent,
  HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { authActions, AuthState } from '@zubr-client/zubr-store';
import * as HttpStatus from 'http-status-codes';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * Http response interceptor
 * @description
 * @export
 * @class HttpResponseInterceptorService
 * @implements {HttpInterceptor}
 * @template T
 */
@Injectable()
export class HttpResponseInterceptorService<T> implements HttpInterceptor {
  public constructor(
    private _store$: Store<AuthState>
  ) {}

  /**
   * Check for unauthorized access
   * @description
   * @param {HttpRequest<T>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<T>>}
   * @memberof HttpResponseInterceptorService
   */
  public intercept(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(request).pipe(
      map((response: HttpEvent<T>) => {
          if (response instanceof HttpResponse) {

            // Handle HttpResponse

          }

          return response;
        }
      ),
      catchError((response: HttpErrorResponse) => {
        if (response.status === HttpStatus.UNAUTHORIZED) {
          this._store$.dispatch(authActions.Logout());
        }

        return throwError(response);
      })
    );
  }
}
