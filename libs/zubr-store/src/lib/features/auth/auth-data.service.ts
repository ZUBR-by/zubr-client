import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { Observable } from 'rxjs';
import { AuthCredentials } from './auth-credentials.interface';
import { AuthData } from './auth-data.interface';
import { authRoutes } from './auth.constants';

/**
 * Auth data service
 * @description
 * @export
 * @class AuthDataService
 */
@Injectable()
export class AuthDataService {

  public constructor(
    public config: DefaultDataServiceConfig,
    public http: HttpClient
  ) {}

  /**
   * Gets auth token
   * @description
   * @param {AuthCredentials} credentials
   * @returns {Observable<AuthData>}
   * @memberof AuthDataService
   */
  public getToken(credentials: AuthCredentials): Observable<AuthData> {

    const headers: HttpHeaders = new HttpHeaders({
      'authorization': 'Basic bG9naW4tYXBwOg==',
      'content-type': 'application/x-www-form-urlencoded',
      'x-workspace': 'zubr',
    });

    const body: string = new HttpParams()
      .set('grant_type', 'password')
      .set('username', credentials.username)
      .set('password', credentials.password)
      .toString();

    return this.http.post<AuthData>(
      this.config.root + authRoutes.GetToken,
      body.toString(),
      {
        headers,
      }
    );
  }
}
