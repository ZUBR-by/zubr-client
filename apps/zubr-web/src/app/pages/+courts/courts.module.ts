import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { CourtsRoutingModule } from './courts-routing.module';
import { CourtsComponent } from './courts.component';

@NgModule({
  declarations: [CourtsComponent],
  imports: [
    CommonModule,
    CourtsRoutingModule,
    ZubrComponentsModule,
  ],
})
export class CourtsModule { }
