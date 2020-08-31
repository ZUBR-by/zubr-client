import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceError, EntityCollectionServiceBase } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, concatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { PageMetadata } from './page-metadata.interface';
import { PageState } from './page-state.interface';
import { pageActions } from './page.actions';

/**
 * Page service
 * @description
 * @export
 * @class PageService
 */
@Injectable()
export class PageService {

  public constructor(
    private _router: Router,
    private _store$: Store<PageState>
  ) {}

  /**
   * Entity Page Tab Instance
   * @description Initializes page tab instance based on a single NgRx entity
   * @template T
   * @param {ActivatedRoute} activatedRoute - the ActivatedRoute of current tab
   * @param {EntityCollectionServiceBase<T>} entityService - custom entity service to fetch data
   * @param {string[]} entityParamsForTitle - An array of entity params
   * used for for page tab title creation, separated by spaces
   * @returns {Observable<T>}
   * @memberof PageService
   */
  public entityPageTabInstance<T>(

    activatedRoute: ActivatedRoute,
    entityService: EntityCollectionServiceBase<T>,
    entityParamsForTitle: string[]

  ): Observable<T> {

    return activatedRoute.params.pipe(

      // Subscribe on route params

      mergeMap(params => {

        // Switching to route state data subscription

        return activatedRoute.data.pipe(

          concatMap(
            (pageMetadata: PageMetadata) => {

              // Switching to API call

              return entityService.getByKey(params.id).pipe(

                // should be ANY entity

                tap((entity: T) => {

                  // Define page tab title base on entity keys

                  let pageTabTitle: string = '';

                  entityParamsForTitle.forEach(
                    entityParam => {
                      const pageTabTitlePart: any = entity[entityParam] ?
                        entity[entityParam] : entityParam;
                      pageTabTitle += ` ${pageTabTitlePart}`;
                    }
                  );

                  // Dispatch an action which will update the page tab metadata

                  this._store$.dispatch(pageActions.UpdatePageTabAction({
                    payload: {
                      url: this._router.url,
                      metadata: {
                        ...pageMetadata,
                        title: pageTabTitle,
                      },
                    },
                  }));

                })

              );
            }
          ),

          // Return an Entity instance as the result

          map((entity: T) => entity),

          catchError((error: DataServiceError) => {

            // Handle possible errors here

            return of(null);

          })

        );

      })
    );
  }

}
