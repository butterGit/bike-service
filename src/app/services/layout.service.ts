import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  sidebarSource$ = new Subject<boolean>();

  showSidebar() : void{
    this.sidebarSource$.next(true);
  }

  hideSidebar() : void{
    this.sidebarSource$.next(false);
  }
  constructor() { }
}
