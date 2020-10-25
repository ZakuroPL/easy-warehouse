import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  ngSelectedLocation = "";
  selectedLocation = "";
  selectedProduct = "";
  selectedProductName = "";
  selectedPcs = null;
  locationFrom = "";
  pcsToTransfer = null;
  pcsToTransferMinus = null;
  locationToTransfer = "";
  locattionToTransferId = "";

  isGetSelectedProduct = false;
  isWrongPcs = false;
  isSuccess = false;
  isNotFound = false;
  isConnected = true;

  numberForCheck = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cookieService: CookieService,
    ) { }

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
    if(this.pcsToTransfer <= this.selectedPcs && this.pcsToTransfer != null) this.postTransferMinus();
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
  postTransferMinus(){
    this.isGetSelectedProduct = false;
    this.pcsToTransferMinus = -this.pcsToTransfer;
    console.log("important " + this.pcsToTransferMinus)
    this.apiService.postTransferProduct(this.locattionToTransferId, this.selectedProduct, this.pcsToTransferMinus, this.locationFrom).subscribe(
      result => {
        this.postTransfer();
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
        if(this.transfers.length == this.numberForCheck){
          this.isNotFound = true;
        }
        else{
          this.isNotFound = false;
        }
        this.ngSelectedLocation = "";
        this.isConnected = true;
      },
      error => console.log(error)
    );
  }






  ngOnInit(): void {
    const token = this.cookieService.get("token");
    if(!token){
      this.router.navigate(['/auth']);
    }
    this.apiService.getLocationList().subscribe(
      data => {
        this.locations = data;
      },
      error => {
        console.log(error)
        this.router.navigate(['/auth']);
      }
    );
    
  }//ngOnInit

}
