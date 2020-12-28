import { Component, OnInit } from '@angular/core';
import * as decode from "jwt-decode";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit {

    
    constructor(private storage: Storage) { 
      this.setToken();
  }
  email:any;
  name: any;
  loggedIn:any;
  ngOnInit() {
  }
  getUserName() {
    this.storage.get("token").then((res) => {
      const decodedToken = decode(res);
      const username = decodedToken.data.name;
      const userEmail = decodedToken.data.email;
      this.email = userEmail;
      this.name = username;
    });
  }
  setToken() {
    const token = this.storage.get("token").then((token) => {
      if (token) {
        this.loggedIn = true;
        this.getUserName();
      } else {
        this.loggedIn = false;
      }
    });
  }
}
