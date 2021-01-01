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
  locationFrom:string;
  pcsToTransfer:number;
  locationToTransfer:string;
  locattionToTransferId:number;

  isGetSelectedProduct:boolean = false;
  isWrongPcs:boolean = false;
  isSuccess:boolean = false;
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
    for(let location of this.locations){
      if(this.locationToTransfer == location.location){
        this.locattionToTransferId = location.id;
      }
    }
    if(this.pcsToTransfer <= this.selectedPcs && this.pcsToTransfer != null) this.postTransfer();
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
        this.isNotFound = this.transfers.length == 0;
        this.isConnected = true;
        this.selectedLocation = "";
      },
      error => console.log(error)
    );
  }
}
