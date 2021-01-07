import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { History, sortHistory } from '../models/history';
import { Product, sortProduct } from '../models/product';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  products:Product[];
  history:History[];
  selectedProduct:string;

  selectedProductByIndex:number;
  selectedProductByName:string;
  selectedProductByEan:number;

  isMoreThanOne:boolean = false;
  isAllEmpty:boolean = false;
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
    this.apiService.getProductList().subscribe(
      data => this.products = data.sort(sortProduct),
      error => console.log(error)
    )
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
    this.apiService.getHistory().subscribe(
      data => {
        data.sort(sortHistory);
        this.history = data.filter(data => data.product_name == this.selectedProduct);
        this.arrayLength = this.history.length;
        this.sliceNumber = 0;
        // console.table(this.history);
        this.isConnected = true;
        this.isNotFound = this.history.length == 0;
        this.selectedProductByIndex = null;
        this.selectedProductByName = "";
        this.selectedProductByEan = null;
      },
      error => console.log(error)
    )
  }
  checkThis(){
    if(this.selectedProductByName  && this.selectedProductByEan ||
    this.selectedProductByName  && this.selectedProductByIndex ||
    this.selectedProductByEan  && this.selectedProductByIndex) this.isMoreThanOne = true;
    else if(!this.selectedProductByName && !this.selectedProductByEan && !this.selectedProductByIndex) this.isAllEmpty = true;
    else this.getProductFromList();
  }
  ok(){
    this.isMoreThanOne = false;
    this.isAllEmpty = false;
  }
  plus(){
    this.sliceNumber += this.plusPlus;
  }
  minus(){
    this.sliceNumber -= this.plusPlus;
    if(this.sliceNumber < 0) this.sliceNumber = 0;
  }
}