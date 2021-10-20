import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Bike } from '../../models/bike';
import { TotalCostComponent } from '../total-cost/total-cost.component';



import { BikeTableRowComponent } from '../bike-table-row/bike-table-row.component';
import { BikesService } from '../../services/bikes.service';
import { CanComponentDeactivate } from '../../guards/form-can-deactivate.guard';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';



@Component({
  selector: 'bikes-list',
  templateUrl: './bikes-list.component.html',
  styleUrls: ['./bikes-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BikesListComponent implements OnInit, CanComponentDeactivate {
  @ViewChild("totalCostRef")
  totalCostRef!: TotalCostComponent;
  @ViewChild("addBikeTitle")
  addBikeTitle!: ElementRef;
  @ViewChildren("app-table-table-row")
  bikeRows!: QueryList<BikeTableRowComponent>;
  @ViewChild('files')
  filesInput!: ElementRef;
  @ViewChild('gallery')
  gallery!: ElementRef;


  upload_preset = 'dzttlvyc';
  url = "https://api.cloudinary.com/v1_1/doavnyryj/upload";
  formData = new FormData();
  imageUrl!: string;
  totalCost!: Observable<number>;
  cost!: number;
  bikes!: Observable<Bike[]>;
  bikeForm!: FormGroup;
  visibleGross: boolean = true;
  constructor(private bikesService: BikesService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.loadBikes();
    this.totalCost.subscribe( (cost : number) => this.cost = cost);
    this.bikeForm = this.buildbikeForm();
  }

  ngAfterViewInit() {

    let addBikeTitle = this.addBikeTitle.nativeElement;
    this.bikeForm.valueChanges.subscribe(() => {
      if (this.bikeForm.invalid) {
        this.renderer.setStyle(addBikeTitle, 'color', 'red')
      } else {
        this.renderer.setStyle(addBikeTitle, 'color', 'white')
      }
    })
  }

  loadBikes(): void {
    this.bikes = this.bikesService.getBikes();
    this.countTotalCost();
  }

  async addBike() {
    await this.addPhotos();
    let bikeFormData = Object.assign({}, this.bikeForm.value);
    // Parsing of strings with Date.parse is strongly discouraged due to browser differences and inconsistencies.
    bikeFormData.deadline = new Date(bikeFormData.deadline);
    bikeFormData.deliveryDate = new Date(bikeFormData.deliveryDate);
    bikeFormData.cost = this.getPartsCost(bikeFormData.parts);
    bikeFormData.imageUrl = this.imageUrl;
    this.bikesService.addBike(bikeFormData);
  }

  getPartsCost(parts: any[]) {
    const reducer = (accumulator: any, currentValue: { price: any; }) => Number(accumulator) + Number(currentValue.price);
    return parts.reduce(reducer, 0);
  }

  onRemovedBike(bike: Bike) {
    this.bikesService.removeBike(bike.id);
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

  buildParts(): FormGroup {
    return this.formBuilder.group({
      name: '',
      inStock: true,
      price: '',
    })
  }

  get parts(): FormArray {
    return <FormArray>this.bikeForm.get('parts');
  }

  addPart(): void {
    this.parts.push(this.buildParts());
  }

  removePart(i: number): void {
    this.parts.removeAt(i);
  }

  countTotalCost(): void {
    this.totalCost = this.bikes.pipe(map(bikes => bikes.reduce((total, currentValue) => total + currentValue.cost, 0)));

  }


  canDeactivate() {
    if (!this.bikeForm.dirty) {
      return true;
    }

    return window.confirm('Are you sure you want to discard changes?');
  }

  async addPhotos() {
    //ading photos to cloudinary
    for (let file of this.filesInput.nativeElement.files) {
      this.formData.append("file", file);
      this.formData.append("upload_preset", this.upload_preset);
      this.formData.append("folder", "cars_service");

      await fetch(this.url, {
        method: "POST",
        body: this.formData
      })
        .then((response) => {

          return response.json();
        })
        .then((data) => {
          this.imageUrl = data.url;

        });

    }
  }



}
