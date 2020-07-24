import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Role } from '../model/role';
import { AlertService } from '../service/alert.service';

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

  constructor(private authenticationService: AuthenticationService, private router: Router, private alertService: AlertService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.name = "Movie Portal";
    this.isLoggedIn = sessionStorage.getItem('currentUser') ? true : false;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    //this.alertService.clear();
    this.alertService.success("Logged Out Successfully !!");
  }

}
