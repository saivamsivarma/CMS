import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public api:ApiService,public router:Router) { }

  url=''
  interval:any;
  blogData=null as any;
  image:any
  ngOnInit(): void {
    this.api.getUserProfile()
    this.api.getUserPosts()
  }
  readArticle(id:any){
    this.router.navigate(['/article',id])
  }
  onFileSelected(event:any) {
    if(event.target.files.length>0){
      const file = event.target.files[0]
      this.image= file;
      console.log(this.image)
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e:any)=>{
        this.url=e.target.result;
      }
    }
}

createImageForm(){
  const formData = new FormData;
    formData.append('picture_image',this.image);
    this.api.updatePic(formData);
  this.api.updatePic(formData);
  this.interval=setInterval(() => {
    this.ngOnInit();
    this.ngOnDestroy(); 
    }, 300);
}

updateArticle(data:any,id:any){
  this.blogData = data
  this.blogData._id=id
  console.log(this.blogData)
}

update()
{
  this.api.updatePostObj=this.blogData
  console.log(this.api.updatePostObj)
  this.api.updatePost();
  this.interval=setInterval(() => {
    this.ngOnInit();
    this.ngOnDestroy(); 
    }, 300);
}

ngOnDestroy() {
  clearInterval(this.interval);
}

}