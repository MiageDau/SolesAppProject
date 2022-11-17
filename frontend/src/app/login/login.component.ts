import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "../shared/auth.service";
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  login : any = "";
  password : any = "";

  constructor(public authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

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
        this._snackBar.open('Login with success, redirection to HomePage! ', 'Undo', {
          duration: 3000
        });  
        this.router.navigateByUrl('/home').then(()=>{
          window.location.reload();
        });
      },
      (error:any)=>{
        console.log("error",error)
        this._snackBar.open('Something gone wrong, please try again! ', 'Undo', {
          duration: 3000
        });  
      }
    )
  }
}
