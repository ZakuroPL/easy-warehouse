import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { filterTransferForPacking, Transfer } from '../models/transfer';

@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.css']
})
export class PackingComponent implements OnInit {


  faSignOutAlt = faSignOutAlt;

  transfers:Transfer[];
  selectedProduct:string;
  selectedProductName:string;
  selectedPcs:number;
  pcsToTransfer:number;
  locationFrom:number = 2;

  isGetSelectedProduct:boolean = false;
  isWrongPcs:boolean = false;
  isSuccess:boolean = false;
  isNotFound:boolean = false;
  isConnected:boolean = false;

  sliceNumber:number = 0;
  arrayLength:number = 0;
  plusPlus:number;

  constructor(
    private apiService: ApiService,
    ) {
      this.apiService.plusPlus$.subscribe((data:number)=> this.plusPlus = data);
     }

  ngOnInit(): void {
    this.refreshData();
  }

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
        this.isWrongPcs = true;
      }
    )
  }
  ok(){
    this.isGetSelectedProduct = false;
    this.isWrongPcs = false;
    this.isSuccess = false;
    this.pcsToTransfer = null;
    this.refreshData();
  }
  refreshData(){
    this.isNotFound = false;
    this.isConnected = false;
    this.apiService.getTransfers().subscribe(
      data => {
        this.transfers = data.filter(filterTransferForPacking);
        if(this.sliceNumber == this.transfers.length) this.sliceNumber = 0;
        this.arrayLength = this.transfers.length;
        this.isConnected = true;
        this.isNotFound = this.transfers.length == 0;
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

