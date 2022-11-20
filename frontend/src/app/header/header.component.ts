import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/auth.service";
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(public authService:AuthService, private router: Router, private _snackBar: MatSnackBar, public http:HttpClient) { }

  ngOnInit(): void {
    // this.isLogged();
    // this.isLoggedServerSide();
  }
  
  logout(){
    this.authService.logout().subscribe(()=>{
      (response:any)=>{
        console.log(response);
      }
    });
    this._snackBar.open('See you soon, redirection to HomePage! ', 'Undo', {
      duration: 3000
    });  
    this.router.navigateByUrl('/home').then(()=>{
      window.location.reload();
    });
  }
  getName(){
    return sessionStorage.getItem("fullname");
  }
  isLogged():Boolean{
    let res = false;
    if(sessionStorage.getItem("id")){
      // console.log("Connecté")
      res = true
    }else{
      // console.log('non connecté');
    }
    return res;
  }
  
  isLoggedServerSide(){
    return this.http.get("http://localhost/islogged");
  }



}
