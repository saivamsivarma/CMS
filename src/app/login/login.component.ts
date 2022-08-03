import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
// import {  GoogleLoginProvider } from "@abacritt/angularx-social-login";private authService: SocialAuthService
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public api:ApiService) { }

  show: boolean = false;
  Email:any;
  Password:any;
  ngOnInit(): void {
  }

  password() {
    this.show = !this.show;
}

  loginUser(){
    this.api.loginObj={};
    this.api.loginObj.email_id=this.Email;
    this.api.loginObj.password = this.Password;
    this.api.login();
  }
  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data)=>{
  //     console.log(data)
  //     this.api.loginObj={}
  //     this.api.loginObj.email=data.email;
  //     this.api.signInWithGoogle();
  //   }) 
  // }

}
