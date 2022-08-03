import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(public route:ActivatedRoute, public api:ApiService,public router:Router) { }

  postData = null as any;
  comment:any;
  interval:any;
  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];
    this.api.getPost(id)
  }

  sendcomment(id:any){
    this.api.sendCommentobj={}
    this.api.sendCommentobj.id = id;
    this.api.sendCommentobj.comment = this.comment;
    this.api.sendcomment()
    this.interval=setInterval(() => {
      this.ngOnInit();
      this.ngOnDestroy(); 
      }, 300);
      this.comment=''
  }


  likePost(id:any){
    this.api.post={}
    this.api.post.id=id
    console.log(this.api.post.id)
    this.api.likePost('true')
    this.interval=setInterval(() => {
      this.ngOnInit();
      this.ngOnDestroy(); 
      },300);
  }

  unlikePost(id:any){
    this.api.post={}
    this.api.post.id=id
    console.log(this.api.post.id)
    this.api.likePost('false')
    this.interval=setInterval(() => {
      this.ngOnInit();
      this.ngOnDestroy(); 
      }, 300);
  }

  dislikePost(id:any){
    this.api.post={}
    this.api.post.id=id
    this.api.dislikePost('true')
    this.interval=setInterval(() => {
      this.ngOnInit();
      this.ngOnDestroy(); 
      },300);
  }

  undislikePost(id:any){
    this.api.post={}
    this.api.post.id=id
    this.api.dislikePost('false')
    this.interval=setInterval(() => {
      this.ngOnInit();
      this.ngOnDestroy(); 
      }, 300);
  }

  count(id:any){
    this.api.count(id)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }



  updatePost(data:any,id:any){
    this.postData = data
    this.postData._id=id
    console.log(this.postData)
  }
  
  update()
  {
    this.api.updatePostObj=this.postData
    console.log(this.api.updatePostObj)
    this.api.updatePost();
    this.interval=setInterval(() => {
      this.ngOnInit();
      this.ngOnDestroy(); 
      }, 300);
  }
  
  deletePost(id:any){
    this.api.deletePost(id)
    this.interval=setInterval(() => {
      this.ngOnInit();
      this.ngOnDestroy(); 
      }, 300);
  }

  getProfile(id:any){
    this.router.navigate(['/userProfile',id])
  }
}