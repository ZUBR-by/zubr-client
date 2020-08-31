import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Testing page component
 * @description
 * @export
 * @class ResultsPageComponent
 */
@Component({
  selector: 'zubr-client-results-page',
  templateUrl: './results-page.component.html',
})
export class ResultsPageComponent implements OnInit {

  /**
   * Today's date
   * @description
   * @type {Date}
   * @memberof ResultsPageComponent
   */
  public today: Date;
  /**
   * Birthdate form group
   * @description
   * @type {FormGroup}
   * @memberof ResultsPageComponent
   */
  public form: FormGroup = new FormGroup({

    birthDate: new FormControl('2020-01-30',
                               [
        Validators.required,
      ]
    ),

  });

  /**
   * Submit handler
   * @description
   * @memberof ResultsPageComponent
   */
  public submit(): void {
    // do something
  }

  /**
   * On Init
   */
  public ngOnInit(): void {}

}
