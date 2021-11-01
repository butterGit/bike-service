import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BikesComponent } from './bikes/bikes.component';
import { RouterModule } from '@angular/router';
import { BikesListComponent } from './bikes-list/bikes-list.component';
import { TotalCostComponent } from './total-cost/total-cost.component';
import { BikeTableRowComponent } from './bike-table-row/bike-table-row.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BikesRoutingModule } from './bikes-routing.module';
import { SharedModule } from '../shared-module/shared.module';
import { SurnameShortcutPipe } from './bikes-pipes/surname-shortcut.pipe';
import { BikeFormComponent } from './bike-form/bike-form.component';
import { EditBikeComponent } from './edit-bike/edit-bike.component';


@NgModule({
  declarations: [
    BikesComponent,
    BikesListComponent,
    TotalCostComponent,
    BikeTableRowComponent,
    SurnameShortcutPipe,
    BikeFormComponent,
    EditBikeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    BikesRoutingModule,
  ],

})
export class BikesModule { }
