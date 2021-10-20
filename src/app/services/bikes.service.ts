import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Bike } from '../models/bike';

@Injectable({
  providedIn: 'root'
})
export class BikesService {

  constructor(private db: AngularFireDatabase) { }

  getBikes(): Observable<Bike[]> {
    return this.db.list<Bike[]>('bikes').snapshotChanges().pipe(map((response: any) => response.map((bike: Bike) => this.assignKey(bike))));
  }

  getBike(id: string): Observable<Bike> {
    return this.db.object<Bike>(`bikes/${id}`).snapshotChanges().pipe(map(bike => this.assignKey(bike)));
  }

  addBike(bike: any) {
    return this.db.list<Bike[]>('bikes').push(bike);
  }

  private assignKey(bike: any) {
    return { ...bike.payload.val(), id: bike.key }
  }

  editBike(id: string, bike: Bike) {
    return this.db.object<Bike>(`bikes/${id}`).update(bike);
  }

  removeBike(id: string) {
    return this.db.object<Bike>(`bikes/${id}`).remove();
  }

}
