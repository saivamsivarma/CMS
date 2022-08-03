import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBlogComponent } from './create-post/create-blog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ArticleComponent } from './post/article.component';
import { ProfileComponent } from './profile/profile.component';
import { TagsComponent } from './tags/tags.component';
import { SearchComponent } from './search/search.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [ { path: '', redirectTo: 'Login', pathMatch: 'full' },
{path:'Login',component:LoginComponent},
{path:'Register',component:SignupComponent},
{path:'Dashboard',component:DashboardComponent},
{path:'create_blog',component:CreateBlogComponent},
{path:'article/:id', component:ArticleComponent},
{path:'Profile',component:ProfileComponent},
{path:'tagSearch/:id',component:TagsComponent},
{path:'search',component:SearchComponent},
{path:'userProfile/:id',component:UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
