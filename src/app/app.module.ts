import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { KeysPipe } from './Pipes/key.pipe'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule , Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeroDetailComponent } from './home/hero-detail/hero-detail.component';
import { HeroSearchComponent } from './home/hero-search/hero-search.component';




const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch: 'full'},
  {path:'home',component:HomeComponent},
  {path:'login', component:LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    KeysPipe,
    HeroDetailComponent,
    HeroSearchComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
