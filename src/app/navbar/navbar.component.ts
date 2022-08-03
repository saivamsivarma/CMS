import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  tags='';
  constructor(public api:ApiService,public router:Router) { }


  isNavCollapsed=false

  collapseNavbar(){
    this.isNavCollapsed =!this.isNavCollapsed
  }

  ngOnInit(): void {
    this.api.getUserProfile()
  }

  search(){
    this.api.tags = this.tags;
    // this.api.getPostTags();
  }

  readArticle(id:any){
    this.router.navigate(['/article',id])
    this.tags = ''
  }

  clear(){
    this.tags = ''
  }
  

}
