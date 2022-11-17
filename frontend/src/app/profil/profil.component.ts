import { Component, OnInit } from '@angular/core';
import { RateService } from "../shared/rate.service";
import { Rate } from "../shared/rate"
import { AuthService } from "../shared/auth.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  rates!: Rate[];
  ratesOfUser!: Rate[];
  user_idConnected = sessionStorage.getItem("id");

  constructor(public rateService: RateService, public authService:AuthService) { }

  ngOnInit(): void {

    // this.getAllRates();
  }

  getUserId() {
    return sessionStorage.getItem("id");
  }
  getFullName() {
    return this.authService.connectedUser.fullname;
    // return sessionStorage.getItem("fullname");
  }
  getLogin() {
    return this.authService.connectedUser.login;
    // return sessionStorage.getItem("login");
  }
  getAllRates() {
    this.rateService.getRates().subscribe((response: any) => {
      console.log(response);
      this.rates = response as Rate[];

      this.rates.forEach(rate => {
        if (rate.user_id == sessionStorage.getItem("id")) {
          this.rateService.rates = rate as Rate[];
          console.log(this.rateService.rates);
        }
      });

    });
  }

  getAllUserRates() {
    this.rateService.getUserRates().subscribe((response: any) => {
      console.log(response);
    })
  }


}
