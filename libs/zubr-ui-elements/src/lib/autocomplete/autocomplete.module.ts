import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { AutocompleteComponent } from './autocomplete.component';

/**
 * Autocomplete module
 * @description
 * @export
 * @class AutocompleteModule
 */
@NgModule({
  declarations: [AutocompleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    TranslateModule,
    MatIconModule,
  ],
  exports: [
    AutocompleteComponent,
  ],
})
export class AutocompleteModule { }
