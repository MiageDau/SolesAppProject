import { Component, OnInit } from '@angular/core';
import { RateService } from "../shared/rate.service";
import { Rate } from "../shared/rate"
import { AuthService } from "../shared/auth.service";
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

  constructor(public rateService: RateService, public authService:AuthService) { }

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
    // this.Rates$ = this.rateService.getRates();

    
    // this.rateService.getRates().subscribe((response: any) => {
    //   console.log(response);
    //   this.rates = response as Rate[];

    //   this.rates.forEach(rate => {
    //     if (rate.user_id == sessionStorage.getItem("id")) {
    //       this.rateService.rates = rate as Rate[];
    //       console.log(this.rateService.rates);
    //     }
    //   });

    // });
    
  }

}
