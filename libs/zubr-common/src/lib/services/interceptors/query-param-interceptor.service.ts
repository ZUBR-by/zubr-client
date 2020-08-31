import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { routerRequestAction } from '@ngrx/router-store';
import * as querystring from 'query-string';
import { Observable } from 'rxjs';

/**
 * Injectable service
 *
 */
@Injectable()
export class QueryParamInterceptorService implements HttpInterceptor {

  /**
   * create query params
   * @param params
   */
  private static createQueryParams(params: HttpParams): { [key: string]: string } {
    const queryParams: any = {};
    for (const key of params.keys()) {
      const values: any = params.getAll(key);

      if (!values) {
        continue;
      }

      if (values.length === 1) {
        queryParams[key] = values[0];

        continue;
      }

      queryParams[key] = values;
    }

    return queryParams;
  }

  public constructor() {}

  /**
   *
   * Intercept calls
   * @param request
   * @param next
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.params.keys().length || request.method !== 'GET') {
      return next.handle(request);
    }

    let lRequest: any = request;

    const { params }: any = request;

    const queryParams: any = QueryParamInterceptorService.createQueryParams(params);

    const queryString: any = querystring.stringify(queryParams, { arrayFormat: 'bracket' });

    const urlWithParams: any = request.urlWithParams.replace(request.params.toString(), queryString);

    lRequest = lRequest.clone({
      url: urlWithParams,
      params: new HttpParams(),
    });

    return next.handle(lRequest);
  }
}
