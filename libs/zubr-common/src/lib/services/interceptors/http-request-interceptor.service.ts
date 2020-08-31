import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authFeatureKey, AuthState } from '@zubr-client/zubr-store';
import { Observable } from 'rxjs';

/**
 * Http request interceptor
 * @description
 * @export
 * @class HttpRequestInterceptorService
 * @implements {HttpInterceptor}
 * @template T
 */
@Injectable()
export class HttpRequestInterceptorService<T> implements HttpInterceptor {
  /**
   * Adds authorization header
   * @description
   * @param {HttpRequest<T>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<T>>}
   * @memberof HttpRequestInterceptorService
   */
  public intercept(
    request: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    const authState: AuthState = JSON.parse(
      localStorage.getItem(authFeatureKey)
    );

    const interceptedRequest: HttpRequest<T> = !!authState.authData
      ? request.clone({
          setHeaders: {
            Authorization: `Bearer  + ${authState.authData.access_token}`,
          },
        })
      : request;

    return next.handle(interceptedRequest);
  }
}
