import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private auth : AuthenticationService) { }
  // request will be intercepted
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if(this.auth.isUserLoggedIn()){
      let token = this.auth.getAuthenticationToken();

      request = request.clone({
        setHeaders : {
          Authorization : token
        }
      });

      // must return the updated request object : otherwise request stop
      return next.handle(request);
    }
    return next.handle(request);
  }
}
