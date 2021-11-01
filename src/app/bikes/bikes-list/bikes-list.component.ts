import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Bike } from '../../models/bike';
import { TotalCostComponent } from '../total-cost/total-cost.component';



import { BikeTableRowComponent } from '../bike-table-row/bike-table-row.component';
import { BikesService } from '../../services/bikes.service';
import { CanComponentDeactivate } from '../../guards/form-can-deactivate.guard';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';



@Component({
  selector: 'bikes-list',
  templateUrl: './bikes-list.component.html',
  styleUrls: ['./bikes-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BikesListComponent implements OnInit, CanComponentDeactivate {

  @ViewChild("totalCostRef")
  totalCostRef!: TotalCostComponent;
  @ViewChild("addBikeTitle")
  addBikeTitle!: ElementRef;
  @ViewChildren("app-table-table-row")
  bikeRows!: QueryList<BikeTableRowComponent>;


  totalCost!: Observable<number>;
  cost!: number;
  bikes!: Observable<Bike[]>;
  bikeForm!: FormGroup;
  visibleGross: boolean = true;
  constructor(private bikesService: BikesService,
   private router: Router
  ) { }

  ngOnInit() {
    this.loadBikes();
    this.totalCost.subscribe((cost: number) => this.cost = cost);

  }

  loadBikes(): void {
    this.bikes = this.bikesService.getBikes();
    this.countTotalCost();
  }

  countTotalCost(): void {
    this.totalCost = this.bikes.pipe(map(bikes => bikes.reduce((total, currentValue) => total + currentValue.cost, 0)));

  }

  canDeactivate() {
    if (!this.bikeForm.dirty) {
      return true;
    }

    return window.confirm('Are you sure you want to discard changes?');
  }


}
