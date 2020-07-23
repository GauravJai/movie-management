import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Role } from '../model/role';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  name: string;
  isLoggedIn: boolean;
  currentUser: User;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.name = "Movie Portal";
    //this.isAdmin = this.authenticationService.isAdmin;
    //this.isAdmin = sessionStorage.getItem('isAdmin') === "true" ? true : false;
    this.isLoggedIn = sessionStorage.getItem('currentUser') ? true : false;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();

    this.router.navigate(['/login']);
  }

}
