import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Testing page component
 * @description
 * @export
 * @class TestPageComponent
 */
@Component({
  selector: 'zubr-client-test-page',
  templateUrl: './test-page.component.html',
})
export class TestPageComponent implements OnInit {

  /**
   * Today's date
   * @description
   * @type {Date}
   * @memberof TestPageComponent
   */
  public today: Date;
  /**
   * Birthdate form group
   * @description
   * @type {FormGroup}
   * @memberof TestPageComponent
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
   * @memberof TestPageComponent
   */
  public submit(): void {
    // do something
  }

  /**
   * On Init
   */
  public ngOnInit(): void {}

}
