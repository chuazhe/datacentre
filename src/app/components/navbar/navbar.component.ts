import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

// Angular imports/exports are used to make the content of one module available to be used in another module
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
