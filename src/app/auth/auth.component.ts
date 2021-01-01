import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import { AuthGuard } from '../auth.guard';

interface myToken{
  token: string;
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  isConnected: boolean= true;
  isWrongPassword: boolean = false;
  cookieGuide: string = "cookieGuide";
  isGuide: boolean = true;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    public guard: AuthGuard
  ) { }
  ngOnInit(): void {
    const guide = this.cookieService.get("guide");
    if(guide) this.isGuide = false;
  }

  saveForm(){
    this.isConnected = false;
    this.apiService.loginUser(this.loginForm.value).subscribe(
      (result: myToken) => {
        this.isConnected = true;
        this.isWrongPassword = false;
        sessionStorage.setItem('token', result.token);
        this.guard.canActivate();
        this.loginForm.reset();
      },
      error => {
        this.isWrongPassword = true;
        this.isConnected = true;
        console.log(error);
      }
    )
  }
  logOut(){
    sessionStorage.removeItem("token");
    this.guard.canActivate();
  }

  guide(){
    this.cookieService.set("guide", "cookieGuide")
    this.isGuide = false;
  }


}
