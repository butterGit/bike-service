import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { BikesService } from '../../services/bikes.service';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Bike } from '../../models/bike';

@Component({
  selector: 'app-bike-form',
  templateUrl: './bike-form.component.html',
  styleUrls: ['./bike-form.component.scss']
})
export class BikeFormComponent implements OnInit{

  form!: FormGroup;
  formData = new FormData();
  imageUrl: string[] = [];
  showFileInput : boolean = true
  upload_preset = environment.cloudinary.upload_preset
  url = environment.cloudinary.url;

  @ViewChild('files') filesInput!: ElementRef;
  @Input() editForm!: boolean;

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

  async editBike(bike : Bike)
  {
    let id : string = this.route.snapshot.params['id'];
    let bikeFormData = Object.assign({}, this.form.value);
    bikeFormData.imageUrl = bike.imageUrl;
    await this.addPhotos();

    for (let i = 0; i < this.imageUrl.length; i++)
       bikeFormData.imageUrl.push(this.imageUrl);

    this.bikesService.editBike(id, bikeFormData);
    this.router.navigate(['/bikes']);
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

  getPartsCost(parts: any[]) {
    const reducer = (accumulator: any, currentValue: { price: any; }) => Number(accumulator) + Number(currentValue.price);
    return parts.reduce(reducer, 0);
  }

  addPart(): void {
    this.parts.push(this.buildParts());
  }

  removePart(i: number): void {
    this.parts.removeAt(i);
  }

}
