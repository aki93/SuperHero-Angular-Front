import { Component, OnInit } from '@angular/core';
import { Service } from '../appService/service';
import { Router } from '@angular/router';
import axios from 'axios'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string
  password:string

  constructor(private service: Service, private router: Router ) {}

  ngOnInit(): void {
    this.service.authorized()
  }

  login(){

    let headers = {'Content-Type': 'application/json'}
    let login= {
       email:this.email,
       password:this.password
       }
    axios.post('http://challenge-react.alkemy.org',JSON.stringify(login),{headers: headers
    }).then((response) => { this.service.saveToken(JSON.stringify(response.data))
    , this.router.navigate(['/home'])},
	(error) => { let errorLog = alert("Introduzca los datos correctos"); }
)}

}
