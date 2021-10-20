import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';



export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FormCanDeactivateGuard implements CanDeactivate<CanComponentDeactivate>  {
  constructor () {}

  canDeactivate(component: CanComponentDeactivate): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return component.canDeactivate ? component.canDeactivate() : true;
    }

}
