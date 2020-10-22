import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, Judge } from '@zubr-client/zubr-store';

@Component({
  selector: 'zubr-client-embed-judge-list',
  templateUrl: './embed-judge-list.component.html',
})
export class EmbedJudgeListComponent implements OnInit {

  @Input()
  public expandable: boolean = false;

  @Input()
  public limit: number = 6;

  @Input()
  public judges: Judge[];

  public displayedJudges: Judge[] = [];

  public expanded: boolean = false;

  public constructor(
    private _store$: Store<AppState>
  ) {}

  public ngOnInit(): void {
    if (this.expandable) {
      this.judges.forEach((judge, index) => {
        if (this.limit > index + 1) {
          this.displayedJudges.push(judge);
        }
      });
    } else {
      this.judges.forEach(judge => {
        this.displayedJudges.push(judge);
      });
    }
  }

  public expand(): void {
    this.displayedJudges = [];
    if (this.expanded) {
      this.judges.forEach((judge, index) => {
        if (this.limit > index + 1) {
          this.displayedJudges.push(judge);
        }
      });
      this.expanded = false;
    } else {
      this.judges.forEach(judge => {
        this.displayedJudges.push(judge);
      });
      this.expanded = true;
    }
  }

}
