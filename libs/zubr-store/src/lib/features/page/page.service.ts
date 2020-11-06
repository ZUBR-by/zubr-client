import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataServiceError, EntityCollectionServiceBase} from '@ngrx/data';
import {of, Observable} from 'rxjs';
import {catchError, concatMap, map, mergeMap} from 'rxjs/operators';
import {PageMetadata} from './page-metadata.interface';

@Injectable()
export class PageService {

  public constructor(
    private _router: Router,
  ) {
  }

  public entityPageInstance<T>(
    activatedRoute: ActivatedRoute,
    entityService: EntityCollectionServiceBase<T>
  ): Observable<T> {

    return activatedRoute.params.pipe(
      mergeMap(params => {
        return activatedRoute.data.pipe(
          concatMap(
            (pageMetadata: PageMetadata) => {
              return entityService.getByKey(params.id).pipe();
            }
          ),
          map((entity: T) => entity),
          catchError((error: DataServiceError) => {
            return of(null);
          })
        );
      })
    );
  }

}
