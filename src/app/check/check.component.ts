import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  locations: any = [];
  transfers: any = [];
  selectedLocation = "";
  myLocation = "";

  numberForCheck = 0;
  isNotFound = false;
  isConnected= true;
  
  constructor(
    private apiService: ApiService,
    private router: Router,
    private cookieService: CookieService,
  ) { }


  ngOnInit(): void {
    this.isNotFound = false;
    const token = this.cookieService.get("token");
    if(!token){
      this.router.navigate(['/auth']);
    }
    this.apiService.getLocationList().subscribe(
      data => {
        this.locations = data;
      },
      error => console.log(error)
    );
    
  }//ngOnInit

  check(){
    this.numberForCheck = 0;
    this.isNotFound = false;
    this.isConnected = false;
    this.myLocation = this.selectedLocation;
    this.apiService.getTransfers().subscribe(
      data => {
        this.transfers = data;
        for (let transfer of this.transfers){
          if(transfer.location_name != this.myLocation || transfer.location_name == this.myLocation && transfer.pcs <= 0) this.numberForCheck++
        }
        if(this.transfers.length == this.numberForCheck){
          this.isNotFound = true;
        }
        else{
          this.isNotFound = false;
        }
        this.selectedLocation = "";
        this.isConnected = true;
      },
      error => {
        console.log(error)
        this.router.navigate(['/auth']);
      }
    );
  }

  

}