
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  
  constructor(public authService:AuthService,private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  
  }

  submit(form?: NgForm):any{
    this.authService.register(form?.value.login,form?.value.password,form?.value.fullname).subscribe(
      (userInfo:any)=>{        
        this.authService.connectedUser = userInfo;
        sessionStorage.setItem("id",userInfo.id);
        sessionStorage.setItem("login",userInfo.login);
        sessionStorage.setItem("fullname",userInfo.fullname);
        this._snackBar.open('Registration with success, redirection to HomePage! ', 'Undo', {
          duration: 3000
        });  
        this.router.navigateByUrl('/home');
    },
    (error:any)=>{
      console.log("error",error);
      this._snackBar.open('Something gone wrong, please try again! ', 'Undo', {
        duration: 3000
      });  
    })
  }

}
