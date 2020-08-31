import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundComponent } from './page-not-found.component';

/**
 * PageNotFound module
 * @description
 * @export
 * @class PageNotFoundModule
 */
@NgModule({
  declarations: [PageNotFoundComponent],
  exports: [
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
  ],
})
export class PageNotFoundModule { }
