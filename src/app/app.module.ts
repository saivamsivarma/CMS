import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuillModule } from 'ngx-quill';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateBlogComponent } from './create-post/create-blog.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ArticleComponent } from './post/article.component';
import { ProfileComponent } from './profile/profile.component';

// import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
// import {
//   GoogleLoginProvider
// } from '@abacritt/angularx-social-login';
import { LoadingComponent } from './loading/loading.component';
import { TagsComponent } from './tags/tags.component';
import { SearchComponent } from './search/search.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    NavbarComponent,
    CreateBlogComponent,
    ArticleComponent,
    ProfileComponent,
    LoadingComponent,
    TagsComponent,
    SearchComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    QuillModule.forRoot({}),
    HttpClientModule
  ],
  // providers: [{
  //   provide: 'SocialAuthServiceConfig',
  //   useValue: {
  //     autoLogin: false,
  //     providers: [
  //       {
  //         id: GoogleLoginProvider.PROVIDER_ID,
  //         provider: new GoogleLoginProvider(
  //           '176172489002-sjf0qea2aj6hht2ciop26g67tpahva9a.apps.googleusercontent.com'
  //         )
  //       }
  //     ],
  //     onError: (err) => {
  //       console.error(err);
  //     }
  //   } as SocialAuthServiceConfig,
  // }],
  bootstrap: [AppComponent]
})
export class AppModule { }
