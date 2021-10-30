import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Router } from  '@angular/router';
import { environment } from '../../environments/environmentChallenge';
import axios from 'axios'

const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class Service {

  private _token:string;
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});


  constructor(private http: HttpClient,private router:Router) { }


  authorized(){
   if(localStorage.getItem('token') != null ){
     this.router.navigate(['/home'])
   }

 }

   notAuthorized(){
    if(localStorage.getItem('token') == null ){
      this.router.navigate(['/login'])
    }

  }

  public get token():string{
    if(this._token != null){
      return this._token
    }else if(this._token == null && localStorage.getItem('token') != null){
      this._token = localStorage.getItem('token')
      return this._token
    }
    return ""
  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    localStorage.setItem('token', accessToken);
  }

  getCharacterById(id:any){
  return axios.get(API_URL + API_KEY + "/"  + `${id}`,
  {headers:{'Content-Type':'application/json'}})
}

searchHeroName(name:any){
  return axios.get(API_URL + API_KEY + "/search/" + `${name}`,
  {headers:{'Content-Type':'application/json'}})
}

logout(){
  localStorage.clear()
  this.router.navigate(['/login'])
}



  }
