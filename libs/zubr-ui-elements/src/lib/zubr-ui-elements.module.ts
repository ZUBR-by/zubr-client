import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutocompleteModule } from './autocomplete';
import { ButtonModule } from './button';
import { DataGridModule } from './data-grid';
import { DatepickerModule } from './datepicker';
import { InputModule } from './input';
import { SelectModule } from './select';
import { SlideToggleModule } from './slide-toggle';
import { SnackBarService } from './snack-bar';
import { TextareaModule } from './textarea';

/**
 * Ui Elements Module
 */
@NgModule({
  imports: [CommonModule],
  exports: [
    InputModule,
    TextareaModule,
    DataGridModule,
    SelectModule,
    SlideToggleModule,
    AutocompleteModule,
    ButtonModule,
    DatepickerModule,
  ],
  providers: [
    SnackBarService,
  ],
})
export class ZubrUiElementsModule {}
