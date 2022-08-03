import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public route:ActivatedRoute, public api:ApiService,public router:Router) { }

  interval:any;

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];
     this.api.getProfileofUsers(id);
     this.api.getOtherUserPosts(id);
  }

  async follow(id:any){
    this.api.user_id = {};
    this.api.user_id.id=id
    this.api.followUsers();
    this.interval=setInterval(() => {
      this.ngOnInit();
      this.ngOnDestroy(); 
      }, 300);
  }

  async unfollow(id:any){
    this.api.user_id = {};
    this.api.user_id.id=id
    this.api.unfollowUsers();
    this.interval=setInterval(() => {
      this.ngOnInit();
      this.ngOnDestroy(); 
      }, 300);
  }


  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getProfile(id:any){
    this.router.navigate(['/userProfile',id])
  }

}
