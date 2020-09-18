import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  ErrorService,
  FormService,
  HttpRequestInterceptorService,
  HttpResponseInterceptorService, LanguageService,
} from '@zubr-client/zubr-common';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { ZubrStoreModule } from '@zubr-client/zubr-store';
import  { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/**
 * AoT requires an exported function for factories
 * @description
 * @export
 * @param {HttpClient} http
 * @returns {TranslateHttpLoader}
 */
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json?var=9');
}

/**
 * NgModule
 * @description
 * @export
 * @class AppModule
 */
@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxMatNativeDateModule,
    ZubrStoreModule.forRoot(
      environment.zubrStoreConfig
    ),
    ZubrComponentsModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    // TranslateModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
  ],
  providers: [
    FormService,
    ErrorService,
    LanguageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptorService,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: QueryParamInterceptorService,
    //   multi: true,
    // },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: environment.zubrStoreConfig.snackBarDuration },
    },
    // {
    //   provide: ErrorHandler,
    //   useClass: SentryErrorHandler,
    // },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
