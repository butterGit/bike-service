import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bike } from '../../models/bike';
import { BikeFormComponent } from '../bike-form/bike-form.component';
import { BikesService } from '../../services/bikes.service';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-edit-bike',
  templateUrl: './edit-bike.component.html',
  styleUrls: ['./edit-bike.component.scss']
})
export class EditBikeComponent implements OnInit {
  @ViewChild('bikeForm') bikeForm!: BikeFormComponent;
  bike!: Bike;
  id!: string;
  imageUrl!: string;

  constructor(private route: ActivatedRoute, private bikeService: BikesService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.bikeService.getBike(this.id).pipe(tap((bike) => this.setBike(bike))).subscribe(bike => this.bike = bike);
  }

  setBike(bike : Bike) {
    const { id, imageUrl, ...formData } = bike;
    this.bikeForm.form.patchValue(formData);
    this.bikeForm.form.controls['deliveryDate'].setValue(new Date(bike.deliveryDate));
    this.bikeForm.form.controls['deadline'].setValue(new Date(bike.deadline));
    this.imageUrl = imageUrl;
  }

}
