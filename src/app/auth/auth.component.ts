import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Key } from 'readline';
import { ApiService } from '../api.service';

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
  isloggedIn = false;
  isConnected= true;
  isWrongPassword = false;
  cookieGuide = "cookieGuide";
  token = "";
  isGuide = true;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
  ) { }
  ngOnInit(): void {
    this.token = this.cookieService.get("token");
    if(this.token){
      this.isloggedIn = true;
    }
    const guide = this.cookieService.get("guide");
    if(guide) this.isGuide = false;
  }

  saveForm(){
    if(!this.token) this.isConnected = false;
    this.apiService.loginUser(this.loginForm.value).subscribe(
      (result: myToken) => {
        this.cookieService.set("token", result.token)
        console.log(result.token)
        this.isloggedIn = true;
        location.reload();
        this.isConnected = true;
      },
      error => {
        this.isWrongPassword = true;
        this.isConnected = true;
        console.log(error);
      }
    )
  }
  logOut(){
    this.cookieService.delete("token");
    this.isloggedIn = false;
    this.isWrongPassword = false;
    location.reload();
  }

  guide(){
    this.cookieService.set("guide", "cookieGuide")
    this.isGuide = false;
  }


}
