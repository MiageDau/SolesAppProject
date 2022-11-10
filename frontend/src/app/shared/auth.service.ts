import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import {  } from "module";
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  selectedUser: User = {
    login : " ",
    password : "",
    fullname : ""
  };
  
  baseUrl = "http://localhost:3000/";
  
  connectedUser : any = null;
  
  constructor(private http: HttpClient) { 
    this.isLogged();
  }

login(login:any,password:any):Observable<any>{
  return this.http.post(this.baseUrl+"login", {login:login,password:password},{withCredentials: true});
}
logout():Observable<any>{
  sessionStorage.clear();
  return this.http.get(this.baseUrl+"logout",{withCredentials:true}); 
}

register(login:any,password:any,fullName:any):Observable<any>{

  return this.http.post(this.baseUrl+"register", {login:login,password:password,fullname:fullName},{withCredentials: true});
}

isLogged(){
  this.http.get(this.baseUrl,{withCredentials: true}).subscribe(
    (connectedUser:any) =>{
      this.connectedUser = connectedUser;
      console.log(this.connectedUser);
      console.log("is connected");
    },
    (error:any)=>{
      console.log("Not connected");
    }
  )
}

}

