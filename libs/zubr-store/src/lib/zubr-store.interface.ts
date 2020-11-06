import { DefaultDataServiceConfig } from '@ngrx/data';

export abstract class ZubrStore {

  public dataServiceConfig: DefaultDataServiceConfig;

  public altDataServiceConfig?: DefaultDataServiceConfig;

  public maxBookmarks: number;

  public snackBarDuration: number;
}
