import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  login:any = "";
  password:any = "";
  fullname:any = "";


  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

  submit():any{

    this.authService.register(this.login,this.password,this.fullname).subscribe(
      (userInfo:any)=>{
        this.authService.connectedUser = userInfo;
        console.log(userInfo);
    },
    (error:any)=>{
      console.log("error",error);
    })
  }

}
