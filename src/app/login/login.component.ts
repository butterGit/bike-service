import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LayoutService } from '../services/layout.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  @ViewChild('toast') toast!: ElementRef;

  user = {
    email: '',
    password: ''
  }



  constructor(private authService: AuthService,
    private router: Router, private layoutService : LayoutService) {}


  onSubmit() {
    this.authService.login(this.user).then(this.onSubmitSuccess.bind(this));

  }

  private onSubmitSuccess () {
    this.router.navigate(['bikes']).then(() => this.layoutService.showSidebar());
  }

  login() {
    this.authService.login(this.user).then(() => this.router.navigate(['bikes']));
  }

  closeToast() {
    this.toast.nativeElement.remove();
  }

}
