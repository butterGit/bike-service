import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BikesComponent } from './bikes/bikes.component';
import { RouterModule } from '@angular/router';
import { BikesListComponent } from './bikes-list/bikes-list.component';
import { BikesDetailsComponent } from './bikes-details/bikes-details.component';
import { TotalCostComponent } from './total-cost/total-cost.component';
import { BikeTableRowComponent } from './bike-table-row/bike-table-row.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BikesRoutingModule } from './bikes-routing.module';
import { SharedModule } from '../shared-module/shared.module';
import { SurnameShortcutPipe } from './bikes-pipes/surname-shortcut.pipe';


@NgModule({
  declarations: [
    BikesComponent,
    BikesListComponent,
    BikesDetailsComponent,
    TotalCostComponent,
    BikeTableRowComponent,
    SurnameShortcutPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    BikesRoutingModule,
  ]
})
export class BikesModule { }
