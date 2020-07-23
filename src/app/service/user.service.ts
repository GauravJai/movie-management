import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../common/Constants';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<User[]>(Constants.loginUrl +`/users`);
  }

  register(user: User) {
      return this.http.post(Constants.loginUrl +`/register`, user);
  }

  delete(id: number) {
      return this.http.delete(Constants.loginUrl +`/users/${id}`);
  }
}
