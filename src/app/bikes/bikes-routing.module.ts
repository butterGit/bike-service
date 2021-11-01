import { NgModule } from '@angular/core'
import { RouterModule, Route } from '@angular/router'

import { BikesComponent } from './bikes/bikes.component';
import { BikesListComponent } from './bikes-list/bikes-list.component';


import { EditBikeComponent } from './edit-bike/edit-bike.component';
import { BikeResolver } from '../resolvers/bike.resolver';



const BIKE_ROUTES: Route[] = [
  {
    path: '',
    component: <any>BikesComponent,
    children: [
      {
        path: '',
        component: BikesListComponent
      },
      {
        path: ':id',
        component: EditBikeComponent,
        resolve: { bike : BikeResolver }
      }
    ]
  }
];



@NgModule({
  imports: [
    RouterModule.forChild(BIKE_ROUTES)
  ],
  exports: [RouterModule],
})

export class BikesRoutingModule { }
