import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login:any = "";
  password:any = "";

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  submit():any{
    this.authService.login(this.login,this.password).subscribe(
      (userInfo:any)=>{
        this.authService.connectedUser = userInfo;
        console.log(userInfo);
      },
      (error:any)=>{
        console.log("error",error)
      }
    )
  }

}
