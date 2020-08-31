import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { MapCommissionListModule } from '../../lists/map-commission-list/map-commission-list.module';
import { CommissionMapComponent } from './commission-map.component';

/**
 * App's language switcher module
 * @description
 * @export
 * @class CommissionMapModule
 */
@NgModule({
  declarations: [CommissionMapComponent],
  exports: [
    CommissionMapComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    ZubrUiElementsModule,
    RouterModule,
    MatProgressSpinnerModule,
    MapCommissionListModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
  ],
})
export class CommissionMapModule { }
