import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBicycle, faHome, faMotorcycle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  bicycleIcon = faBicycle;
  homeIcon = faHome;
  motorcycleIcon = faMotorcycle;
  signoutIcon = faSignOutAlt;
  githubIcon = faGithub;

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
