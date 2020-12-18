import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
  


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  faExchangeAlt = faExchangeAlt;

  locations: any = [];
  transfers: any = [];
  ngSelectedLocation:string;
  selectedLocation:string;
  selectedProduct:string;
  selectedProductName:string;
  selectedPcs:number;
  locationFrom:string;
  pcsToTransfer:number;
  locationToTransfer:string;
  locattionToTransferId:string;

  isGetSelectedProduct:boolean = false;
  isWrongPcs:boolean = false;
  isSuccess:boolean = false;
  isNotFound:boolean = false;
  isConnected:boolean = true;

  numberForCheck:number;

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
    this.refreshData();
    this.locationToTransfer = "";
    this.pcsToTransfer = null;
  }
  refreshData(){
    this.isConnected = false;
    this.apiService.getTransfers().subscribe(
      data => {
        this.transfers = data;
        this.transfers.sort((a,b) =>{
          return a.product_name.localeCompare(b.product_name);
        });
        this.isConnected = true;
      },
      error => console.log(error)
    );
  }

  check(){
    this.numberForCheck = 0;
    this.selectedLocation = this.ngSelectedLocation;
    this.isConnected = false;
    this.apiService.getTransfers().subscribe(
      data => {
        this.transfers = data;
        this.transfers.sort((a,b) =>{
          return a.product_name.localeCompare(b.product_name);
        });
        for (let transfer of this.transfers){
          if(transfer.location_name != this.selectedLocation || transfer.location_name == this.selectedLocation && transfer.pcs <= 0) this.numberForCheck++
        }
        this.isNotFound = this.transfers.length == this.numberForCheck ? true : false;
        this.ngSelectedLocation = "";
        this.isConnected = true;
      },
      error => console.log(error)
    );
  }
}
