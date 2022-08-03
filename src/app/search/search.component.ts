import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search:any
  constructor(public api:ApiService,public router:Router) { }

  tagsSearch(){
    this.api.tags = this.search;
    this.api.getPostByTagsName();
    this.search='';
  }

  readArticle(id:any){
    this.router.navigate(['/article',id])
  }

  ngOnInit(): void {
  }

}
