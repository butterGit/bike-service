import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { BikesService } from '../../services/bikes.service';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bike-form',
  templateUrl: './bike-form.component.html',
  styleUrls: ['./bike-form.component.scss']
})
export class BikeFormComponent implements OnInit{

  form!: FormGroup;
  formData = new FormData();
  imageUrl: string[] = [];

  upload_preset = environment.cloudinary.upload_preset
  url = environment.cloudinary.url;

  @ViewChild('gallery') gallery!: ElementRef;
  @ViewChild('files') filesInput!: ElementRef;

  constructor(private formBuilder: FormBuilder,
    private bikesService: BikesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.form = this.buildbikeForm();
  }

  buildbikeForm() {
    return this.formBuilder.group({
      model: ['', Validators.required],
      type: '',
      deliveryDate: ['', Validators.required],
      deadline: ['', Validators.required],
      color: ['', Validators.required],
      clientFirstName: ['', Validators.required],
      clientSurname: ['', Validators.required],
      isFullyDamaged: false,
      year: ['', Validators.required],
      imageUrl: ['', Validators.required],
      parts: this.formBuilder.array([])
    })
  }

  get parts(): FormArray {
    return <FormArray>this.form.get('parts');
  }

  buildParts(): FormGroup {
    return this.formBuilder.group({
      name: '',
      inStock: true,
      price: '',
    })
  }

  addPart(): void {
    this.parts.push(this.buildParts());
  }

  removePart(i: number): void {
    this.parts.removeAt(i);
  }

  async addBike() {
    await this.addPhotos();
    let bikeFormData = Object.assign({}, this.form.value);
    // Parsing of strings with Date.parse is strongly discouraged due to browser differences and inconsistencies.
    bikeFormData.deliveryDate = (new Date(bikeFormData.deliveryDate)).toISOString().slice(0,10);
    bikeFormData.deadline = (new Date(bikeFormData.deadline)).toISOString().slice(0,10);
    bikeFormData.cost = this.getPartsCost(bikeFormData.parts);
    bikeFormData.imageUrl = this.imageUrl;
    this.bikesService.addBike(bikeFormData);
  }

  async addPhotos() {
    //ading photos to cloudinary
    for (let file of this.filesInput.nativeElement.files) {
      this.formData.append("file", file);
      this.formData.append("upload_preset", this.upload_preset);
      this.formData.append("folder", "bike_service");

      await fetch(this.url, {
        method: "POST",
        body: this.formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.imageUrl.push(data.url);
        });
    }
  }

  getPartsCost(parts: any[]) {
    const reducer = (accumulator: any, currentValue: { price: any; }) => Number(accumulator) + Number(currentValue.price);
    return parts.reduce(reducer, 0);
  }

  editBike()
  {
    let bikeFormData = Object.assign({}, this.form.value);
    let id : string = this.route.snapshot.params['id'];
    this.bikesService.editBike(id, bikeFormData);
    this.router.navigate(['/bikes']);
  }

}
