import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public api:ApiService,public router:Router) { }

  TopicsGroup = [{ Value: "Education", Name: "Education"}, { Value: "Sports", Name: "Sports" }, { Value: "Health", Name: "Health"},{ Value: "Business", Name: "Business"},{ Value: "Travel", Name: "Travel"},{ Value: "Technology", Name: "Technology"}]

  ngOnInit(): void {
    this.api.getPosts();
    this.api.getAllTags();
  }

  readArticle(id:any){
    this.router.navigate(['/article',id])
  }

  tagSearch(id:any){
    this.router.navigate(['/tagSearch',id])
  }

}
