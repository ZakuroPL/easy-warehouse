import { identifierModuleUrl, ThrowStmt } from '@angular/compiler';
import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-index',
  templateUrl: './add-index.component.html',
  styleUrls: ['./add-index.component.css']
})
export class AddIndexComponent implements OnInit {

  products: any = [];
  isEan = false;
  indexNumber: number;
  nameString = "";
  eanNumber: number;


  isGoodLengthIndex = true;
  isGoodLengthName = true;
  isGoodLengthEAN = true;
  isUniqueIndex = true;
  isUniqueEan = true;

  isOk = false;
  isConfirmCreated = false;



  tryCreateProduct(){
      if(this.indexNumber > 99 && this.indexNumber < 1000){
        if(this.nameString.length >= 10){
          if(this.isEan){
            if(this.eanNumber > 999999999999 && this.eanNumber < 100000000000000) this.checkData();
            else this.isGoodLengthEAN = false;
          }
          else{
            this.eanNumber = this.indexNumber
            this.checkData();
          }
        }
        else this.isGoodLengthName = false;
      }
      else this.isGoodLengthIndex = false;
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
    this.indexNumber = null;
    this.nameString = '';
    this.eanNumber = null;
  }


  constructor(
    private apiService: ApiService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    const token = this.cookieService.get("token");
    if(!token){
      this.router.navigate(['/auth']);
    }
    this.apiService.getProductList().subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.log(error)
      }
    );
  }//ngOnInit


}
