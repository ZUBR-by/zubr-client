import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {
  AppState,
  Judge,
  JudgeEntityService,
  Decision,
  DecisionEntityService,
  PageService,
  selectTotalCountOfDecisions
} from '@zubr-client/zubr-store';
import {DataGridOptions, EntityDataSource} from '@zubr-client/zubr-ui-elements';
import {Observable, Subject} from 'rxjs';
import {delay, takeUntil, tap} from 'rxjs/operators';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'zubr-client-judge-page',
  templateUrl: './judge-detail-page.component.html',
})
export class JudgeDetailPageComponent implements OnInit, OnDestroy {

  public viewError: boolean = false;

  public entity$: Observable<Judge>;

  public judges$: Observable<Judge[]>;

  public judgeLoading$: Observable<boolean>;

  public _stop$: Subject<void> = new Subject();

  public dataGridOptions: DataGridOptions<Decision> = {
    dataSource: new EntityDataSource(this._decisionEntityService),
    columns: [
      {
        label: 'article',
        displayName: 'article',
        visibleOnMobile: true,
        labelPrefix: 'article'
      },
      {
        label: 'aftermath',
        displayName: 'aftermath',
        visibleOnMobile: true
      },
      {
        label: 'timestamp',
        displayName: 'date',
        visibleOnMobile: true,
        displayType: 'date',
      },
    ],
    entityOptions: {
      count: 10,
      page: 1,
      searchBy: '',
      search: '',
    },
    routerLinkPrefix: '/elections/message/',
    routerLinkKey: 'id',
    enablePagination: true,
    enableSorting: true,
    searchControl: new FormControl(''), // use this control in view file
    searchKeyControl: new FormControl(''), // search in column name
    additionalFilterControl: new FormControl(undefined), // additional filter
    additionalFilterControl2: new FormControl(undefined), // additional filter
    additionalFilterKey: 'judge.id',
    emptyMessageTitle: 'no_judges_found',
    totalPageCount: this._store$.select<number>(selectTotalCountOfDecisions),
  };

  public constructor(
    private _activatedRoute: ActivatedRoute,
    private _pageService: PageService,
    private _judgeEntityService: JudgeEntityService,
    private _decisionEntityService: DecisionEntityService,
    private _translateService: TranslateService,
    private _store$: Store<AppState>,
    private _router: Router
  ) {
  }

  public ngOnInit(): void {

    this._judgeEntityService.clearCache();

    this.entity$ = this._pageService
      .entityPageInstance<Judge>(
        this._activatedRoute,
        this._judgeEntityService
      )
      .pipe(
        tap((entity: Judge) => {

          this.viewError = !entity;

          return entity;

        }),
        takeUntil(this._stop$)
      );

    this.judgeLoading$ = this._judgeEntityService.loading$.pipe(
      delay(0),
      tap(
        () => {
          setTimeout(() => {
              const d: Document = document;
              const s: any = d.createElement('script');
              s.src = 'https://zubr-court.disqus.com/embed.js';
              s.setAttribute('data-timestamp', new Date().toString());
              (d.head || d.body).appendChild(s);
            }, 500
          );
        }
      ),
      takeUntil(this._stop$)
    );

  }

  public ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }
}
