import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { EntityCollectionServiceBase, QueryParams } from '@ngrx/data';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { DataGridEntityOptions } from '.';

/**
 * EntityDataSource
 * @description Custom DataSource implementation for server-side sorting /
 * searching / pagination + @NgRx/Data entity support
 * @export
 * @class EntityDataSource
 * @implements {DataSource<T>}
 * @template T
 */
export class EntityDataSource<T> implements DataSource<T> {

  // Define preliminary subjects of entity list and loading state

  /**
   * Readiness status' subject
   * @description
   * @type {BehaviorSubject<boolean>}
   * @memberof EntityDataSource
   */
  public loadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Source readiness status
   * @description
   * @type {Observable<boolean>}
   * @memberof EntityDataSource
   */
  public loading$: Observable<boolean> = this.loadingSubject$.asObservable();

  /**
   * Entities
   * @description
   * @type {Observable<T>}
   * @memberof EntityDataSource
   */
  public entities$: Observable<T[]>;

  /**
   * Entity list subject
   * @description
   * @type {BehaviorSubject<T>}
   * @memberof EntityDataSource
   */
  private entityListSubject$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(null);

  public constructor(
    private _entityService: EntityCollectionServiceBase<T>
  ) {
    this.entities$ = this.entityListSubject$.asObservable();
  }

  /**
   *
   * Re-implementation of connect() function using custom Observable
   * @param collectionViewer
   */
  public connect(collectionViewer: CollectionViewer): Observable<T[]> {

    return this.entityListSubject$.asObservable();

  }

  /**
   * Disconnect from data source
   * @description
   * @param {CollectionViewer} collectionViewer
   * @memberof EntityDataSource
   */
  public disconnect(collectionViewer: CollectionViewer): void {

    this.entityListSubject$.complete();
    this.loadingSubject$.complete();

  }

  /**
   * Csv file data source
   * @description
   * @param {File} csvFile
   * @returns {Observable<T>}
   * @memberof EntityDataSource
   */
  public importFromCSV(csvFile: File): Observable<T> {

    if (typeof this._entityService['importFromCSV'] === 'function') {
      return this._entityService['importFromCSV'](csvFile);
    } else { return of(null); }

  }

  /**
   * load() - loads multiple entities with query params
   * @param entityOptions - query params of HTTP request
   */
  public load(entityOptions: DataGridEntityOptions): Observable<T> {

    // Set loading subject to true
    this.loadingSubject$.next(true);

    // Clearing cache of existing entities after the previous call

    this._entityService.clearCache();

    // Define query params which we need to transform before making API call

    let queryParams: any = this._stringify(entityOptions);

    if (queryParams.type && queryParams.type === 'places') {
      queryParams = queryParams['search'];
    }

    return this._entityService.getWithQuery(queryParams).pipe(

      // Handle successful response with entities

      switchMap((entities: T[]) => {

        this.entityListSubject$.next(null);
        this.loadingSubject$.next(false);

        // Return entities only if it's not empty

        if (entities.length > 0) {
          this.entityListSubject$.next(entities);
        }

        return entities;

      }),

      // Handle errors

      catchError(error => {

        this.loadingSubject$.next(false);

        return of(error);

      })

    );
  }

  /**
   * Converts Options object into QueryParams object (all properties become string type)
   * @description
   * @private
   * @memberof EntityDataSource
   */
  private _stringify(options: DataGridEntityOptions): QueryParams {
    const params: QueryParams = {};
    Object.keys(options).forEach(key => {
      const value: string | number | boolean | Date = options[key];
      if ((typeof value !== 'undefined') && (value !== null)) {
          params[key] = value.toString();
      }
    });

    return params;
  }
}
