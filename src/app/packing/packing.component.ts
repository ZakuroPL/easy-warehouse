import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.css']
})
export class PackingComponent implements OnInit {


  faSignOutAlt = faSignOutAlt;

  transfers: any = [];
  selectedProduct = "";
  selectedProductName = "";
  selectedPcs = null;
  pcsToTransfer = null;

  locationFrom = 2;
  numberForCheck = 0;

  isGetSelectedProduct = false;
  isWrongPcs = false;
  isSuccess = false;
  isNotFound = false;
  isConnected = true;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cookieService: CookieService,
    ) { }

  getSelectedProduct(product, pcs, productName){
    this.selectedProduct = product;
    this.selectedPcs = pcs;
    this.selectedProductName = productName;
    this.isGetSelectedProduct = true;
  }
  tryTransfer(){

    if(this.pcsToTransfer <= this.selectedPcs && this.pcsToTransfer != null) this.postTransfer();
    else{
      this.isWrongPcs = true;
      this.pcsToTransfer = null;
  }
    }  
  postTransfer(){
    this.isGetSelectedProduct = false;
    this.apiService.postPackingProduct(this.locationFrom, this.selectedProduct, this.pcsToTransfer).subscribe(
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
    this.pcsToTransfer = null;
  }
  refreshData(){
    this.isConnected = false;
    this.apiService.getTransfers().subscribe(
      data => {
        this.transfers = data;
        this.check();
      },
      error => console.log(error)
    );
  }



  check(){
    this.numberForCheck = 0;
    for (let transfer of this.transfers){
      if(transfer.location != this.locationFrom || transfer.location == this.locationFrom && transfer.pcs <= 0) this.numberForCheck++
    }
    if(this.transfers.length == this.numberForCheck){
      this.isNotFound = true;
    }
    else{
      this.isNotFound = false;
    }
    this.isConnected = true;
  }




  ngOnInit(): void {
    this.isConnected = false;
    const token = this.cookieService.get("token");
    if(!token){
      this.router.navigate(['/auth']);
    }
    this.apiService.getTransfers().subscribe(
      data => {
        this.transfers = data;
        this.check();
      },
      error => {
        console.log(error)
        this.router.navigate(['/auth']);
      }
    );
  }//ngOnInit

}

