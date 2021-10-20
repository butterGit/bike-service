import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from './services/layout.service';
import { faBicycle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  bicycleIcon = faBicycle;
  title = 'bike-service';

  isSidebarVisible: boolean = false;
  isLoading: boolean = false;

  constructor(private layout: LayoutService, private router: Router) {

  }

  ngOnInit() {
    this.layout.sidebarSource$.subscribe((isSidebarVisible) => {
      this.isSidebarVisible = isSidebarVisible;
    })

  }
}
