import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pizza-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pizza-summary.component.html',
})
export class PizzaSummaryComponent {
  @Input() public formModel: FormGroup;

  @Input() public total: string;

  @Input() public prices: any;
}
