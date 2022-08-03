import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  TopicsGroup = [{ Value: "Education", Name: "Education" }, { Value: "Sports", Name: "Sports" }, { Value: "Health", Name: "Health" },{ Value: "Business", Name: "Business" },{ Value: "Travel", Name: "Travel" }]

  url='';
  title:any;
  category:any;
  poster:any;
  tags:any;
  post_content:any;

  constructor(public api:ApiService) { }
  ngOnInit(): void {
  }

  onFileSelected(event:any) {
    
    if(event.target.files.length>0){
      const file = event.target.files[0]
      this.poster= file;
      console.log(this.poster)
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e:any)=>{
        this.url=e.target.result;
      }
    }
     
}
  createBlogForm(){
    console.log(this.poster);
    const formData = new FormData;
    formData.append('title',this.title);
    formData.append('category',this.category);
    formData.append('post_content',this.post_content)
    formData.append('file',this.poster);
    formData.append('tags',this.tags);
    this.api.createPost(formData);
  }

}
