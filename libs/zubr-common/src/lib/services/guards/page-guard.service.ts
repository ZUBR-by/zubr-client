import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Data,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {ReducerManagerDispatcher, Store} from '@ngrx/store';
import {
  pageActions, AppState,
  PageTab
} from '@zubr-client/zubr-store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Meta, Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root',
})
export class PageGuardService implements CanActivate {
  public constructor(
    private _dispatcher: ReducerManagerDispatcher,
    private _store$: Store<AppState>,
    private title: Title,
    private meta: Meta,
    private translate: TranslateService
  ) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const routeMetadata: Data = route.data;
    const pageTab: PageTab = {
      url: state.url,
      metadata: routeMetadata,
    };

    this.translate.get(routeMetadata.title).subscribe(translation => {
      this.title.setTitle(`${translation} | ZUBR`);

      this.meta.updateTag({content: `ZUBR - ${translation}`}, "property='og:title'")
      this.meta.updateTag({content: `ZUBR - ${translation}`}, "name='title'")
    });

    this.meta.updateTag({content: window.location.origin + state.url}, "property='og:url'")

    if (routeMetadata.navigateToPageTab) {
      this._store$.dispatch(pageActions.ChangePageTabAction({payload: pageTab,}));

      return this._dispatcher.pipe(
        map(action => {
          return !(action.type === pageActions.PageTabsLimitExceededAction.type);
        })
      );
    }

    return false;
  }
}
