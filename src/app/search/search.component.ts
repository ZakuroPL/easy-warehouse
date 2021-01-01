import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product, sortProduct } from '../models/product';
import { Transfer, sortTransferForTransfer } from '../models/transfer';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  products:Product[];
  transfers:Transfer[];

  selectedProduct:string;
  myProduct:string;

  selectedProductByIndex:number;
  selectedProductByName:string;
  selectedProductByEan:number;

  isMoreThanOne:boolean = false;
  isAllEmpty:boolean = false;
  isNotFound:boolean = false;
  isConnected:boolean = true;
  
  constructor(
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getProductList().subscribe(
      data => {
        this.products = data.sort(sortProduct);
      },
      error => {
        console.log(error);
      }
    );
  }

  getProductFromList(){
    this.isConnected = false;
    this.isNotFound = false;
    for (let product of this.products){
      if(!this.isMoreThanOne){
        if(this.selectedProductByIndex == product.index ||
            this.selectedProductByName == product.name 
            || this.selectedProductByEan == product.ean) this.selectedProduct = product.name;
        }
    }
    this.apiService.getTransfers().subscribe(
      data => {
        data.sort(sortTransferForTransfer);
        this.transfers = data.filter(data => data.product_name == this.selectedProduct && data.pcs > 0);
        this.isConnected = true;
        this.isNotFound = this.transfers.length == 0;
        this.selectedProductByIndex = null;
        this.selectedProductByName = "";
        this.selectedProductByEan = null;
      },
      error => console.log(error)
    )
  }
  checkThis(){
    if(this.selectedProductByName && this.selectedProductByEan ||
    this.selectedProductByName && this.selectedProductByIndex ||
    this.selectedProductByEan && this.selectedProductByIndex) this.isMoreThanOne = true;
    else if(!this.selectedProductByName && !this.selectedProductByEan && !this.selectedProductByIndex) this.isAllEmpty = true;
    else this.getProductFromList();  }
  ok(){
    this.isMoreThanOne = false;
    this.isAllEmpty = false;
  }
}
