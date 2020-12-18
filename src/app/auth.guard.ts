import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  islogged:boolean

  canActivate(){
    if(sessionStorage.getItem("token")) {
      this.islogged = true;
      return true;
    }
    else {
      this.islogged = false;
      return false;
    }
  };
}
