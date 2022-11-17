import { Component, OnInit } from '@angular/core';
import { RateService } from "../shared/rate.service";
import { Rate } from "../shared/rate"
import { AuthService } from "../shared/auth.service";
import { ShoeService } from "../shared/shoe.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  rates!: Rate[];
  ratesOfUser!: Rate[];
  Rates$!: Observable<Rate[]>
  user_idConnected = sessionStorage.getItem("id");

  constructor(public rateService: RateService, public authService:AuthService, public shoeService:ShoeService) { }

  ngOnInit(): void {

    // this.Rates$ = this.rateService.getUserRates();
    this.getAllRates();
  }

  getUserId() {
    return sessionStorage.getItem("id");
  }
  getFullName() {
    // return this.authService.connectedUser.fullname;
    return sessionStorage.getItem("fullname");
  }
  getLogin() {
    // return this.authService.connectedUser.login;
    return sessionStorage.getItem("login");
  }
  getAllRates() {
    let ratesOfUser:any = [];
    let allRates = this.rateService.getRates(); 
    let user_id = sessionStorage.getItem('id');
    allRates.forEach((rates:any) => {
      rates.forEach((rate:any) => {
        if(rate.user_id == user_id){
          ratesOfUser.push(rate);
        }
      });
    });
    this.ratesOfUser = ratesOfUser;
    
    console.log(this.ratesOfUser);
  }

  getShoeNameFromId(shoe_id:any){
    this.shoeService.getShoeInformation(shoe_id).subscribe((response:any)=>{
      response.shoeName;
    });
  }

  onDelete(rate_id:any){
    if(confirm('Are you sure to delete this shoe ?') == true){
      this.rateService.deleteRate(rate_id).subscribe(()=>{
        window.location.reload();
      });
    }
  }

}

