import { AfterViewInit, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { ReducerManagerDispatcher } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@zubr-client/zubr-common';
import { ConfirmationDialogComponent, ConfirmationDialogOptions } from '@zubr-client/zubr-components';
import { interval, Subject, Subscription } from 'rxjs';
import { first, map, mergeMap, takeUntil, tap } from 'rxjs/operators';

/**
 * Root component
 * @description
 * @export
 * @class AppComponent
 */
@Component({
  selector: 'zubr-client-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {

  /**
   * Subscription termination property
   * @description
   * @private
   * @type {Subject<void>}
   * @memberof PatientDetailPageComponent
   */
  private _stop$: Subject<void> = new Subject();

  public constructor(
    private _dispatcher: ReducerManagerDispatcher,
    private _languageService: LanguageService,
    private _translateService: TranslateService,
    private _swUpdate: SwUpdate,
    private _dialog: MatDialog
  ) {
    this._languageService.init();
  }

  /**
   * After view init
   */
  public ngAfterViewInit(): void {

    // In case of new updates available
    this._swUpdate.available.subscribe((event: UpdateAvailableEvent) => {
      // localStorage.setItem('update', JSON.stringify(event));
      this.onUpdateAvailableModal();
    });

    // show disclaimer

    // if (!localStorage.getItem('disclaimer_confirmed') || localStorage.getItem('disclaimer_confirmed') !== '1') {
    //   const dialogData: ConfirmationDialogOptions = {
    //     title: 'Disclaimer / Внимание / Увага',
    // tslint:disable-next-line:max-line-length
    //     content: `<p class="p1">ZUBR is the Application for visualizing the electoral campaign in the Republic of Belarus. The Project does not represent the government entity, political parties and associations. All data presented in the Application are obtained from public official sources, references to which are posted on the Application pages.</p><p class="p1">&nbsp;</p><p class="p1">ZUBR - это приложение по визуализации электоральной кампании в Республике Беларусь. Проект не представляет интересы государственных органов, политических партий и объединений. Все данные, представленные в приложении, получены из публичных официальных источников, ссылки на которые размещены на страницах приложения.</p><p class="p1">&nbsp;</p><p class="p1">ZUBR - гэта прыкладанне па візуалізацыі электаральнай кампаніі ў Рэспубліцы Беларусь. Праект не з'яўляецца прадстаўніком дзяржаўных органаў, палітычных партый і аб'яднанняў. Усе дадзеныя, прадстаўленыя ў прыкладанні, атрыманы з публічных афіцыйных крыніц, спасылкі на якія размешчаны на старонках прыкладання.</p>`,
    //     disableCancellation: true,
    //     yesLabel: 'accept',
    //   };
    //
    //   const dialogRef: MatDialogRef<ConfirmationDialogComponent> =
    //     this._dialog.open(ConfirmationDialogComponent, {
    //       data: dialogData,
    //       disableClose: false,
    //     });
    //
    //   dialogRef.afterClosed()
    //     .pipe(
    //       map(confirmation => {
    //         if (confirmation) {
    //           localStorage.setItem('disclaimer_confirmed', '1');
    //         }
    //       }),
    //       takeUntil(this._stop$)
    //     )
    //     .subscribe();
    // }
  }

  /**
   * Method shows modal to confirm the available update
   * @private
   */
  private onUpdateAvailableModal(): void {
    const dialogData: ConfirmationDialogOptions = {
      title: this._translateService.instant('update_available'),
      content: this._translateService.instant('confirm_to_continue_update'),
      disableCancellation: true,
      yesLabel: 'install',
    };

    const dialogRef: MatDialogRef<ConfirmationDialogComponent> =
      this._dialog.open(ConfirmationDialogComponent, {
        data: dialogData,
        disableClose: false,
      });

    dialogRef.afterClosed()
      .pipe(
        map(confirmation => {
          if (confirmation) {
            // localStorage.removeItem('update');
            window.location.reload();
          }
        }),
        takeUntil(this._stop$)
      )
      .subscribe();
  }
}
