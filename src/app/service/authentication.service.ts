import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { Constants } from '../common/Constants';
import { AlertService } from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private alertService: AlertService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) { /* /authenticate */
    let authToken = "Basic " + window.btoa(username + ":" + password);

    let headers = new HttpHeaders({
      Authorization: authToken,
      responseType: "text"
    });

    return this.http.get<any>(Constants.loginUrl + "/login/" + username, { headers: headers })
      .pipe(map(user => {
        // this._isAdmin = this.checkIfAdmin(user);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem("token", authToken);
        //sessionStorage.setItem("isAdmin", this._isAdmin.toString());
        this.currentUserSubject.next(user);
        return user;
      }),
        map(error => {
          console.log(error);
        })
      );

  }

  /* checkIfAdmin = (user: User): boolean => {
    let isAdmin: boolean =false;
    user.roles.forEach(role => {
      if(role === 'ADMIN'){
        isAdmin = true;
      }
    });
    return isAdmin;
  } */

  getAuthenticationToken() {
    return sessionStorage.getItem("token");
  }

  isUserLoggedIn(): boolean {
    // if 'user' key is present
    let user = sessionStorage.getItem('currentUser');
    if (user == null)
      return false;
    else
      return true;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
