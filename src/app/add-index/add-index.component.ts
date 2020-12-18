import { Component, OnInit,  } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-index',
  templateUrl: './add-index.component.html',
  styleUrls: ['./add-index.component.css']
})
export class AddIndexComponent implements OnInit {

  products:any = [];
  isEan = false;
  indexNumber:number;
  nameString = "";
  eanNumber:number;


  isGoodLengthIndex = true;
  isGoodLengthName = true;
  isGoodLengthEAN = true;
  isUniqueIndex = true;
  isUniqueEan = true;

  isOk = false;
  isConfirmCreated = false;

  ngOnInit(): void {
    this.apiService.getProductList().subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.log(error)
      }
    );
  }
  tryCreateProduct(){
    if (!this.indexNumber || this.indexNumber < 99 || this.indexNumber > 999) this.isGoodLengthIndex = false;
    else if (this.nameString.length < 10) this.isGoodLengthName = false;
    else if (this.isEan && this.eanNumber < 1000000000000 ||this.isEan && this.eanNumber >= 10000000000000) this.isGoodLengthEAN = false;
    else if (!this.isEan){
      this.eanNumber = this.indexNumber
      this.checkData();
    }
    else this.checkData();
  };
  checkData(){
    for(let product of this.products){
      if(product.index == this.indexNumber) this.isUniqueIndex = false;
      else if(product.ean == this.eanNumber) this.isUniqueEan = false;
    }
    if(this.isUniqueIndex && this.isUniqueEan) this.isOk = true;
  }
  createNewProduct(){
    this.apiService.postNewProduct(this.indexNumber, this.nameString, this.eanNumber).subscribe(
      result => {
        console.log(result);
        this.isOk = false;
        this.isConfirmCreated = true;
        this.indexNumber = null;
        this.nameString = '';
        this.eanNumber = null;
      },
      error => {
        console.log(error);
      }
    )
  }
  restart(){
    this.isGoodLengthIndex = true;
    this.isGoodLengthName = true;
    this.isGoodLengthEAN = true;
    this.isUniqueIndex = true;
    this.isUniqueEan = true;
    this.isOk = false;
    this.isConfirmCreated = false;
  }


  constructor(
    private apiService: ApiService,
  ) { }


}
