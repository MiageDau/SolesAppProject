import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/auth.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    this.isLogged()
  }
  
  logout(){
    this.authService.logout().subscribe(()=>{
      (response:any)=>{
        console.log(response);
      }
    });
  }
  getName(){
    return sessionStorage.getItem("fullname");
  }
  isLogged():Boolean{
    let res = false;
    if(sessionStorage.getItem("id")){
      console.log("Connecté")
      res = true
    }else{
      console.log('non connecté');
    }
    return res;
  }
  

}
