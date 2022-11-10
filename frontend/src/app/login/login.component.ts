import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "../shared/auth.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  login : any = "";
  password : any = "";

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(form?: NgForm):any{
    this.authService.login(form?.value.login,form?.value.password).subscribe(
      (userInfo:any)=>{
        this.authService.connectedUser = userInfo;
        sessionStorage.setItem("id",userInfo.id);
        sessionStorage.setItem("login",userInfo.login);
        sessionStorage.setItem("fullname",userInfo.fullname);
        console.log(sessionStorage);
      },
      (error:any)=>{
        console.log("error",error)
      }
    )
  }
}
