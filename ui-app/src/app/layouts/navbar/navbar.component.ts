import { Component, OnInit } from '@angular/core';
import {ILogin, Login} from "../../share/model/login";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  login?: ILogin = new Login();

  constructor() { }

  ngOnInit() {
  }

  logIn() {

  }

}
