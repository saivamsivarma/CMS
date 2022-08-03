import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  user_id:any;
  id:any;
  token:any;
  httpOptions:any;

  formHeader:any;
  registerObj:any;
  registerResult:any;
  registerLoad=false;

  googleLoad=false
  loginObj:any;
  loginResult:any;
  loginLoad=false;

  createPostObj:any;
  createPostResult:any;
  createPostLoad=false;

  getPostsResult:any;
  getPostsLoad=false;

  postResult:any;
  postLoad:any;

  userProfile:any;
  profileLoad=false;

  getUserPost:any;
  userPostLoad=false;

  getPostByTags:any;
  getPostBYtagsLoad=false;
  tags:any;

  sendCommentobj:any;
  sendCommentLoad=false;

  post:any
  checkLike:any
  checkDislike =false

  reaction:any

  imageload=false

  updatePostLoad=false;
  updatePostObj:any
  updatedResult:any

  getTagsLoad=false;
  getTags:any;

  getPostByTagNameLoad=false;
  getPostByTagNameResult:any;

  getProfileByUserLoad=false;
  getProfileByUserResult:any;

  getOtherUsersLoad=false;
  getOtherusersResult:any;

  followObject:any;
  checkFollowing=false

  constructor(public http:HttpClient,public router:Router) { }

  // user sign_up
  async register(){
    this.registerLoad = true; //loading state
    this.http.post(environment.api_host+'auth/register',this.registerObj).subscribe(res=>{ //calling api
      this.registerResult = JSON.parse(JSON.stringify(res));//storing the data
      localStorage.setItem("token",this.registerResult.token); //setting the token to localstoreage
      localStorage.setItem("id",this.registerResult.id); //setting the id to localstorage
      this.registerLoad = false; //stoping loading state

    },err=>{
      console.error(err.message); //console.log error
    })
  }

  //user sign_in
  async login(){
    this.loginLoad=true;//loading state
    this.http.post(environment.api_host+'auth/login',this.loginObj).subscribe(res=>{ //calling api
      this.loginResult = JSON.parse(JSON.stringify(res)); //storing the data
      localStorage.setItem("token",this.loginResult.token);
      localStorage.setItem("id",this.loginResult.id);
      this.router.navigate(['/Dashboard'])
      this.loginLoad=false;//stoping loading state
    },err=>{
      console.error(err.message)
    })
  }

  //getting all latest tags in the system
  async getAllTags(){
    this.getTagsLoad=true; //loading state
    this.token = localStorage.getItem('token') //getting token
    this.httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.token
      })
    };
    this.http.get(environment.api_host+'tags/',this.httpOptions).subscribe(res=>{ //calling api
      this.getTags=JSON.parse(JSON.stringify(res)); //storing the data
      console.log(this.getTags);
      this.getTagsLoad=false;//stoping loading state
    },err=>{
      console.log(err.message);
    })
  }

  //create Post api
  async createPost(data:any){
    this.createPostLoad=true; //loading state
    this.token = localStorage.getItem('token')
    this.httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.token
      })
    };
    this.http.post(environment.api_host+'posts/',data,this.httpOptions).subscribe(res=>{ //calling api
      this.createPostResult = JSON.parse(JSON.stringify(res)); //storing the data
      console.log(this.createPostResult);
      this.router.navigate(['/Dashboard']);
      this.createPostLoad=false;//stoping loading state
    })
  }

  //get all posts
  async getPosts(){
    this.getPostsLoad=true; //loading state
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.token
      })
    };
    this.http.get(environment.api_host+'posts/',this.httpOptions).subscribe(res=>{ //calling api
      this.getPostsResult=JSON.parse(JSON.stringify(res)); //storing the data
      console.log(this.getPostsResult);
      this.getPostsLoad=false;//stoping loading state
    },err=>{
      console.log(err.message);
    })
  }

  //get single post
  async getPost(id:any){
    this.postLoad=true; //loading state
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.token
      })
    };
    this.http.get(environment.api_host+`posts/${id}`,this.httpOptions).subscribe(res=>{ //calling api
      this.postResult = JSON.parse(JSON.stringify(res));//storing the data
      this.id = localStorage.getItem('id')
      this.checkLike = this.postResult.post.likes.find((x: any)=>x== this.id)
      this.checkDislike = this.postResult.post.unlikes.find((x: any)=>x== this.id)
      console.log(this.postResult)
      this.postLoad = false;//stoping loading state
    },err=>{
      console.log(err.message);
    })
  }

  // deletePost
  async deletePost(id:any){
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.token
      })
    };
    this.http.delete(environment.api_host+`posts/${id}`,this.httpOptions).subscribe(res=>{ //calling api
    this.router.navigate(['/Dashboard']) //navigate to dashboard
    },err=>{
      console.log(err.message);
    })
  }

  //like post action function
  async likePost(add:any){
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.token
      })
    };
    this.http.patch(environment.api_host+`posts/like?add=${add}`,this.post,this.httpOptions).subscribe(res=>{ //calling api
      this.postResult = JSON.parse(JSON.stringify(res));//storing the data
      this.id = localStorage.getItem('id')
      console.log(this.postResult.post);
    })
  }

  //dislike action function
  async dislikePost(add:any){
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.token
      })
    };
    this.http.patch(environment.api_host+`posts/dislike?add=${add}`,this.post,this.httpOptions).subscribe(res=>{ //calling api
      this.postResult = JSON.parse(JSON.stringify(res));//storing the data
      this.id = localStorage.getItem('id')
      console.log(this.postResult.post);
    })
  }

  //getting all reaction count
  async count(id:any){
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.token
      })
    };
    this.http.get(environment.api_host+`posts/count/${id}`,this.httpOptions).subscribe(res=>{ //calling api
      this.reaction = JSON.parse(JSON.stringify(res));//storing the data
      console.log(this.reaction);
    })
  }

  //getting user profile
  async getUserProfile(){
    this.profileLoad=true; //loading state
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.token
      })
    };
    this.http.get(environment.api_host+'user/',this.httpOptions).subscribe(res=>{ //calling api
      this.userProfile = JSON.parse(JSON.stringify(res));//storing the data
      this.profileLoad = false;//stoping loading state
    },err=>{
      console.log(err.message);
    })
  }

  //update User 
  async updateUserPic(data:any){
    this.imageload =true //loading state
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.token
      }),
    };
    this.http.patch(environment.api_host+'user/update/dp',data,this.httpOptions).subscribe(res=>{ //calling api
      this.userProfile = JSON.parse(JSON.stringify(res));//storing the data
      console.log(this.userProfile);
      this.router.navigate(['/Dashboard'])
      this.imageload = false;//stoping loading state
    },err=>{
      console.log(err.message)
    })
  }

  // getting user posts
  async getUserPosts(){
    this.userPostLoad =true; //loading state
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('id')
    this.httpOptions={
      headers : new HttpHeaders({
        'authorization':this.token
      })
    };
    this.http.get(environment.api_host+`posts/userPost/${this.id}`,this.httpOptions).subscribe(res=>{ //calling api
      this.getUserPost = JSON.parse(JSON.stringify(res));//storing the data
      console.log(this.getUserPost);
      this.userPostLoad = false;//stoping loading state
    },err=>{
      console.log(err.message);
    })
  }


  //following other users
  async followUsers(){
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.token
      })
    };
    this.http.patch(environment.api_host+`user/following`,this.user_id,this.httpOptions).subscribe(res=>{ //calling api
      this.getProfileByUserResult = JSON.parse(JSON.stringify(res));//storing the data
      this.id = localStorage.getItem('id')
      console.log(this.getProfileByUserResult);
      this.getProfileByUserLoad = false;
    },err=>{
      console.log(err.message);
    })
  }



  async unfollowUsers(){
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.token
      })
    };
    this.http.patch(environment.api_host+`user/unfollowing`,this.user_id,this.httpOptions).subscribe(res=>{ //calling api
      this.getProfileByUserResult = JSON.parse(JSON.stringify(res));//storing the data
      this.id = localStorage.getItem('id')
      console.log(this.getProfileByUserResult);
      this.getProfileByUserLoad = false;
    },err=>{
      console.log(err.message);
    })
  }


  async getOtherUserPosts(user_id:any){
    console.log(user_id)
    this.getOtherUsersLoad =true; //loading state
    this.token = localStorage.getItem('token');
    this.httpOptions={
      headers : new HttpHeaders({
        'authorization':this.token
      })
    };
    this.http.get(environment.api_host+`posts/posts/${user_id}`,this.httpOptions).subscribe(res=>{ //calling api
      this.getOtherusersResult = JSON.parse(JSON.stringify(res));//storing the data
      console.log(this.getOtherusersResult);
      this.getOtherUsersLoad = false;//stoping loading state
    },err=>{
      console.log(err.message);
    })
  }

  //get post by Tag Id
  async getPostTags(id:any){
      this.getPostBYtagsLoad = true; //loading state
      this.token = localStorage.getItem('token');
      this.httpOptions={
        headers : new HttpHeaders({
          'authorization':this.token
        })
      };
      this.http.get(environment.api_host+`tags/${id}`,this.httpOptions).subscribe(res=>{ //calling api
        this.getPostByTags = JSON.parse(JSON.stringify(res));//storing the data
        console.log(this.getPostByTags);
        this.getPostBYtagsLoad = false;//stoping loading state
      },err=>{
        console.log(err.message);
      })
    }

    //getting post By Tag Name
    async getPostByTagsName(){
      this.getPostByTagNameLoad = true; //loading state
      this.token = localStorage.getItem('token');
      this.httpOptions={
        headers : new HttpHeaders({
          'authorization':this.token
        })
      };
      this.http.get(environment.api_host+`posts/tag/${ this.tags}`,this.httpOptions).subscribe(res=>{ //calling api
        this.getPostByTagNameResult = JSON.parse(JSON.stringify(res));//storing the data
        console.log(this.getPostByTagNameResult);
        this.getPostByTagNameLoad = false;//stoping loading state
      },err=>{
        console.log(err.message);
      })
    }

    //posting comment on post
  async sendcomment(){
    this.sendCommentLoad=true; //loading state
    this.token = localStorage.getItem('token');
    console.log(this.token)
    this.httpOptions={
      headers : new HttpHeaders({
        'authorization':this.token
      })
    };
    this.http.patch(environment.api_host+`posts/comment`,this.sendCommentobj,this.httpOptions).subscribe(res=>{ //calling api
      this.postResult = JSON.parse(JSON.stringify(res));//storing the data
      console.log(this.postResult);
      this.sendCommentLoad = false;//stoping loading state
    },err=>{
      console.log(err.message);
    })
  }

  //update post function
  async updatePost(){
    this.updatePostLoad = true; //loading state
    this.token = localStorage.getItem('token');
    console.log(this.token)
    this.httpOptions={
      headers : new HttpHeaders({
        'authorization':this.token
      })
    };
    this.http.patch(environment.api_host+`posts/update`,this.updatePostObj,this.httpOptions).subscribe(res=>{ //calling api
      this.updatedResult = JSON.parse(JSON.stringify(res));//storing the data
      console.log(this.updatedResult);
      this.updatePostLoad = false;//stoping loading state
    },err=>{
      console.log(err.message);
    })
  }

  //getting other user profile
  async getProfileofUsers(id:any){
    this.getProfileByUserLoad = true; //loading state
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('id')
    this.httpOptions={
      headers : new HttpHeaders({
        'authorization':this.token
      })
    };
    this.http.get(environment.api_host+`user/userProfile/${id}`,this.httpOptions).subscribe(res=>{ //calling api
      this.getProfileByUserResult = JSON.parse(JSON.stringify(res));//storing the data
      console.log(this.getProfileByUserResult)
      this.checkFollowing = this.getProfileByUserResult.userDetails.followers.find((x:any)=>x== this.id)
      this.getProfileByUserLoad = false;//stoping loading state
    },err=>{
      console.log(err.message);
    })
  }


  //logout function
  async logout(){
    localStorage.removeItem('token')
    localStorage.removeItem("id")
    this.router.navigate(['/Login'])
  }


  //updating user image
  async updatePic(data:any){
    this.imageload =true //loading state
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.token
      }),
    };
    this.http.patch(environment.api_host+'user/update/dp',data,this.httpOptions).subscribe(res=>{ //calling api
      this.userProfile = JSON.parse(JSON.stringify(res));//storing the data
      console.log(this.userProfile);
      this.imageload = false;//stoping loading state
    },err=>{
      console.log(err.message)
    })
  }

}