import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { sortTransferForTransfer, Transfer } from '../models/transfer';
import { Location } from '../models/location';
  


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  faExchangeAlt = faExchangeAlt;

  locations:Location[];
  transfers:Transfer[];
  selectedLocation:string;
  locationName:string;
  selectedProduct:string;
  selectedProductName:string;
  selectedPcs:number;
  locationFrom:number;
  pcsToTransfer:number;
  locationToTransfer:string;
  locattionToTransferId:number;

  isGetSelectedProduct:boolean = false;
  isWrongPcs:boolean = false;
  isSuccess:boolean = false;
  isNotFound:boolean = false;
  isConnected:boolean = true;
  isBothSame:boolean = false;

  sliceNumber:number = 0;
  arrayLength:number = 0;
  plusPlus:number;
  isRefresh:boolean;

  constructor(
    private apiService: ApiService,
    ) { 
      this.apiService.plusPlus$.subscribe((data:number)=> this.plusPlus = data);
    }

  ngOnInit(): void {
    this.apiService.getLocationList().subscribe(
      data => {
        this.locations = data;
      },
      error => {
        console.log(error)
      }
    );
  }

  getSelectedProduct(product, pcs, location, productName){
    this.selectedProduct = product;
    this.selectedPcs = pcs;
    this.locationFrom = location;
    this.selectedProductName = productName;
    this.isGetSelectedProduct = true;
  }
  tryTransfer(){
    this.isBothSame = false;
    for(let location of this.locations){
      if(this.locationToTransfer == location.location){
        this.locattionToTransferId = location.id;
      }
    }
    if(this.pcsToTransfer <= this.selectedPcs && this.pcsToTransfer != null && this.locationFrom != this.locattionToTransferId) this.postTransfer();
    else if(this.locationFrom == this.locattionToTransferId) this.isBothSame = true;
    else{
      this.isWrongPcs = true;
      this.pcsToTransfer = null;
      this.locationToTransfer = "";
  }
    }  
  postTransfer(){
    this.apiService.postTransferProduct(this.locationFrom, this.selectedProduct, this.pcsToTransfer, this.locattionToTransferId).subscribe(
      result => {
        this.isSuccess = true;
        console.log(result);
      },
      error => {
        console.log(error);
        this.isWrongPcs = true;
      }
    )
  }
  ok(){
    this.isGetSelectedProduct = false;
    this.isWrongPcs = false;
    this.isSuccess = false;
    this.locationToTransfer = "";
    this.pcsToTransfer = null;
    this.refreshData();
  }
  refreshData(){
    this.isConnected = false;
    if(this.selectedLocation) this.locationName = this.selectedLocation;
    this.apiService.getTransfers().subscribe(
      data => {
        data.sort(sortTransferForTransfer);
        this.transfers = data.filter(data=> data.pcs > 0 && data.location_name == this.locationName);
        if(this.transfers && this.sliceNumber == this.transfers.length ||this.transfers && !this.isRefresh) this.sliceNumber = 0;
        this.arrayLength = this.transfers.length;
        this.isNotFound = this.transfers.length == 0;
        this.isConnected = true;
        this.selectedLocation = "";
      },
      error => console.log(error)
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
