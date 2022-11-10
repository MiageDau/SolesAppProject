
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  


  constructor(public authService:AuthService,private router: Router) { }

  ngOnInit(): void {
  
  }

  submit(form?: NgForm):any{
    this.authService.register(form?.value.login,form?.value.password,form?.value.fullname).subscribe(
      (userInfo:any)=>{        
        this.authService.connectedUser = userInfo;
        console.log(this.authService.connectedUser);
    },
    (error:any)=>{
      console.log("error",error);
    })
  }

}
