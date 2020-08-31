import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, Member } from '@zubr-client/zubr-store';

/**
 * Member list component
 * @description
 * @export
 * @class EmbedMemberListComponent
 */
@Component({
  selector: 'zubr-client-embed-member-list',
  templateUrl: './embed-member-list.component.html',
})
export class EmbedMemberListComponent implements OnInit {

  /**
   * Display type of list
   * @description
   */
  @Input()
  public type: string = 'commission';
  /**
   * Display type of list
   * @description
   */
  @Input()
  public expandable: boolean = false;
  /**
   * Display type of list
   * @description
   */
  @Input()
  public limit: number = 6;

  /**
   * Members
   * @description
   */
  @Input()
  public members: Member[];

  /**
   * displayed members
   */
  public displayedMembers: Member[] = [];

  /**
   * Expanded
   */
  public expanded: boolean = false;

  public constructor(
    private _store$: Store<AppState>
  ) {}

  /**
   * On init
   */
  public ngOnInit(): void {
    if (this.expandable) {
      this.members.forEach((member, index) => {
        if (this.limit > index + 1) {
          this.displayedMembers.push(member);
        }
      });
    } else {
      this.members.forEach(member => {
        this.displayedMembers.push(member);
      });
    }
  }

  /**
   * Expand
   */
  public expand(): void {
    this.displayedMembers = [];
    if (this.expanded) {
      this.members.forEach((member, index) => {
        if (this.limit > index + 1) {
          this.displayedMembers.push(member);
        }
      });
      this.expanded = false;
    } else {
      this.members.forEach(member => {
        this.displayedMembers.push(member);
      });
      this.expanded = true;
    }
  }

}
