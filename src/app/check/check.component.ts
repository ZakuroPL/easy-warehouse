import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  locations: any = [];
  transfers: any = [];
  selectedLocation:string;
  myLocation:string;

  numberForCheck:number = 0;
  isNotFound:boolean = false;
  isConnected:boolean = true;
  
  constructor(
    private apiService: ApiService,
  ) { }


  ngOnInit(): void {
    this.apiService.getLocationList().subscribe(
      data => {
        this.locations = data;
      },
      error => console.log(error)
    );
  }

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
        this.isNotFound = this.transfers.length == this.numberForCheck ? true : false;
        this.selectedLocation = "";
        this.isConnected = true;
      },
      error => {
        console.log(error)
      }
    );
  }

  

}
