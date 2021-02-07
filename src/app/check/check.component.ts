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

  sliceNumber:number = 0;
  arrayLength:number = 0;
  plusPlus:number;

  constructor(
    private apiService: ApiService,
  ) {
    this.apiService.plusPlus$.subscribe((data:number)=> this.plusPlus = data);
   }


  ngOnInit(): void {
    this.apiService.getLocationList().subscribe(
      (data:Location[]) => {
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
        this.arrayLength = this.transfers.length;
        this.sliceNumber = 0;
        this.isNotFound = this.transfers.length == 0;
        this.selectedLocation = "";
        this.isConnected = true;
      },
      error => {
        console.log(error)
      }
    );
  }
  plus(){
    this.sliceNumber += this.plusPlus;
  }
  minus(){
    this.sliceNumber -= this.plusPlus;
    if(this.sliceNumber < 0) this.sliceNumber = 0;
  }



}
