import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bike } from '../../models/bike';
import { BikeFormComponent } from '../bike-form/bike-form.component';
import { BikesService } from '../../services/bikes.service';
import { tap } from 'rxjs/internal/operators/tap';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-bike',
  templateUrl: './edit-bike.component.html',
  styleUrls: ['./edit-bike.component.scss'],
})
export class EditBikeComponent implements OnInit {
  @ViewChild('bikeForm') bikeForm!: BikeFormComponent;
  bike!: Bike;
  id!: string;
  imageUrl: string[] = [];
  stateFlags: boolean[] = [];
  indexStateFlag = 0;
  showCarousel = true;
  editForm = true;

  constructor(
    private route: ActivatedRoute,
    private bikeService: BikesService,
    private formBuilder : FormBuilder,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.bikeService
      .getBike(this.id)
      .pipe(tap((bike) => this.patchBikeForm(bike)))
      .subscribe((bike) => (this.bike = bike));

    if (this.showCarousel)
      this.initializeStateArray();
  }

  patchBikeForm(bike: Bike) {
    const { id, imageUrl, ...formData } = bike;
    if (imageUrl.length !== 0)
      this.imageUrl = imageUrl;
    else
      this.showCarousel = false

    this.showCarousel = true;
    this.bikeForm.form.patchValue(formData);
  }

  initializeStateArray() {
    this.stateFlags[0] = true;

    for (let i = 1; i < this.imageUrl.length; i++) {
      this.stateFlags[i] = false;
    }
  }

  toggleStateLeft() {
    console.log(this.bike);
    this.indexStateFlag++;
    if (this.indexStateFlag < this.stateFlags.length) {
      this.stateFlags[--this.indexStateFlag] = false;
      this.stateFlags[this.indexStateFlag] = true;
    }
    else
      this.indexStateFlag = 0;
  }

  toggleStateRight() {
    this.indexStateFlag--;
    if (this.indexStateFlag < this.stateFlags.length) {
      this.stateFlags[++this.indexStateFlag] = false;
      this.stateFlags[this.indexStateFlag] = true;
    }
    else
      this.indexStateFlag = 0;
  }

  resetForm() {
    this.bikeForm.form.reset();
  }

  editBike(bike : Bike) {
    this.bikeForm.editBike(bike);
  }

}
