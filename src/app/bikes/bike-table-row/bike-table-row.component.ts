import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Bike } from 'src/app/models/bike';
import { BikesService } from 'src/app/services/bikes.service';


@Component({
  selector: '[app-bike-table-row]',
  templateUrl: './bike-table-row.component.html',
  styleUrls: ['./bike-table-row.component.scss']
})
export class BikeTableRowComponent{

  @Input() bike!: Bike;
  @Output() removedBike = new EventEmitter();
  @HostBinding('class.after-deadline') deadline : boolean = false;

  @HostListener('mouseenter') onmouseenter() {
    this.setRemoveBtnStyle('red');
  }

  @HostListener('mouseleave') onmouseleave() {
    this.setRemoveBtnStyle('#0d6efd');
  }

  constructor(private el : ElementRef,
     private renderer : Renderer2,
     private bikeService : BikesService) {}

  ngOnInit() {
    this.deadline = new Date(this.bike.deadline) < new Date();
  }

  setRemoveBtnStyle(color: string){
    this.renderer.setStyle(this.el.nativeElement.querySelector('.remove-btn'), 'color', color);
  }

  removeBike(bike : Bike, event : Event) {
    event.stopPropagation();
    this.bikeService.removeBike(bike.id);
  }
}
