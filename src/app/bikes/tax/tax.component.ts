import {Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-total-cost',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaxComponent {

  @Input() cost!: number;
  showTaxes: boolean = false;
  tax: number = 0;

  countTaxes()
  {
    this.showTaxes = true;
    this.tax = this.cost * 0.15;
  }

}
