import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
    private apiService: ApiService,
  ) { }
  userForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
  });

  isCreated = false
  isError = false

  ngOnInit(): void {
  }
  create(){
    this.isCreated = false
    this.isError = false
    this.apiService.createUser(this.userForm.value).subscribe(
      result => this.isCreated = true,
      error => this.isError = true
    )
  }


}
