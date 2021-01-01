import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Transfer, sortTransferForTransfer } from '../models/transfer';
import { Location } from '../models/location';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  locations:Location[];
  transfers:Transfer[];
  selectedLocation:string;
  myLocation:string;

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
    this.isNotFound = false;
    this.isConnected = false;
    this.myLocation = this.selectedLocation;
    this.apiService.getTransfers().subscribe(
      data => {
        data.sort(sortTransferForTransfer);
        this.transfers = data.filter(data => data.pcs > 0 && data.location_name == this.selectedLocation);
        this.isNotFound = this.transfers.length == 0;
        this.selectedLocation = "";
        this.isConnected = true;
      },
      error => {
        console.log(error)
      }
    );
  }

  

}
