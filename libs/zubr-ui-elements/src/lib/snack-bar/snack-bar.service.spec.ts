import { TestBed } from '@angular/core/testing';

import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarService, SNACKBAR_TYPE } from './snack-bar.service';

describe('SnackBarService', () => {
  let service: SnackBarService;
  let mockSnackBar: any;
  const testMessage: string = 'message';
  const translatedTestMessage: () => string = () => `${testMessage}_translated`;
  const openMethodName: string = 'open';
  const snackBarWarnConfig: MatSnackBarConfig = { panelClass: SNACKBAR_TYPE.WARN };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        SnackBarService,
        {
          provide: TranslateService,
          useValue: { instant: translatedTestMessage },
        },
        { provide: MatSnackBar, useValue: { open: () => {} } },
      ],
    }).compileComponents();
    service = TestBed.inject(SnackBarService);
    mockSnackBar = TestBed.get(MatSnackBar);
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  it('should open an actual snackbar', () => {
    spyOn(mockSnackBar, openMethodName);
    service.open('message');

    expect(mockSnackBar.open).toBeCalled();
  });

  it('should translate the message', () => {
    spyOn(mockSnackBar, openMethodName);
    service.open(testMessage);

    expect(mockSnackBar.open).toHaveBeenCalledWith(translatedTestMessage(), null, null);
  });

  it('should add warning class when passed optional WARN parameter', () => {
    spyOn(mockSnackBar, openMethodName);
    service.open(testMessage, SNACKBAR_TYPE.WARN);

    expect(mockSnackBar.open)
      .toHaveBeenCalledWith(translatedTestMessage(), null, snackBarWarnConfig);
  });
});
