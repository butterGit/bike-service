import {NgModule} from '@angular/core'
import {RouterModule, Route} from '@angular/router'


import { BikesComponent } from './bikes/bikes.component';
import { BikesListComponent } from './bikes-list/bikes-list.component';
import { BikesDetailsComponent } from './bikes-details/bikes-details.component';
import { BikeResolve } from '../services/bike-resolve.service';


const BIKE_ROUTES : Route[] = [
    {
      path: '',
      component: <any>BikesComponent,
      children: [
        {
          path: '',
          component: <any>BikesListComponent
        },
        {
          path: ':id',
          component: <any>BikesDetailsComponent,
          resolve: { bike: BikeResolve }
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

export class BikesRoutingModule {}
