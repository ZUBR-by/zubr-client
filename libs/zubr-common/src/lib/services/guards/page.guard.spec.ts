import { async, inject, TestBed } from '@angular/core/testing';

import { ReducerManagerDispatcher, Store, StoreModule } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { PageGuardService } from './page-guard.service';

describe('PageGuardService', () => {

  // Add the imported module to the imports array in beforeEach

  beforeEach(async (() => {

    TestBed.configureTestingModule({

      imports: [
        StoreModule,
      ],

      declarations: [

        // The component that's being tested
      ],

      providers: [

        PageGuardService,
        ReducerManagerDispatcher,
        {
          provide: Store,
          useValue: MockStore,
        },
      ],

    }).compileComponents();

  }));

  it('should be truthy', inject([PageGuardService], (guard: PageGuardService) => {
    expect(guard).toBeTruthy();
  }));

});
