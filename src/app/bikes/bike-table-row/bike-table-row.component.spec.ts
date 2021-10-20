import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeTableRowComponent } from './bike-table-row.component';

describe('BikeTableRowComponent', () => {
  let component: BikeTableRowComponent;
  let fixture: ComponentFixture<BikeTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikeTableRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
