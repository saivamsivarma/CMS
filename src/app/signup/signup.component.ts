import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  formHeader='signUp'

  url="../../assets/user.svg"
  image:any
  TopicsGroup = [{ Value: "Education", Name: "Education" }, { Value: "Sports", Name: "Sports" }, { Value: "Health", Name: "Health" },{ Value: "Business", Name: "Business" },{ Value: "Travel", Name: "Travel" }]

  show: boolean = false;
  first_Name:any;
  last_Name:any;
  Email:any;
  Password:any;
  confirmPassword:any;
  ischeck:any;

  constructor(public api:ApiService,public router:Router) { }
 
  ngOnInit(): void {
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

removeFileSelected(){
  this.url="../../assets/user.svg";
}

stateChange(state:any){
  this.formHeader =state
}


  password() {
    this.show = !this.show;
}

  async registerUser(){
    this.api.registerObj={};
    this.api.registerObj.first_Name=this.first_Name;
    this.api.registerObj.last_Name =  this.last_Name;
    this.api.registerObj.email_id = this.Email;
    this.api.registerObj.password = this.Password;
    this.api.register();
    this.formHeader='profilePic'
  }

  createImageForm(){
    const formData = new FormData;
    formData.append('picture_image',this.image);
    this.api.updateUserPic(formData);
  }

}
