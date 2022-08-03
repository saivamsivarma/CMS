import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  constructor(public route:ActivatedRoute, public api:ApiService,public router:Router) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];
    this.api.getPostTags(id)
  }

  readArticle(id:any){
    this.router.navigate(['/article',id])
  }
  
}
