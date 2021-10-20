import {Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-total-cost',
  templateUrl: './total-cost.component.html',
  styleUrls: ['./total-cost.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalCostComponent {

  @Input() cost!: number;
  tax: number = 0;

  countTax()
  {
    this.tax = this.cost * 0.18;
  }

}
