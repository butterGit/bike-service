import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Bike } from '../models/bike';
import { BikesService } from '../services/bikes.service';

@Injectable({
  providedIn: 'root'
})
export class BikeResolver implements Resolve<Bike> {

  bike!: Bike;
  constructor(private bikeService: BikesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Bike {
    this.bikeService.getBike(route.params['id']).subscribe(bike => this.bike = bike)
    return this.bike;
  }
}
