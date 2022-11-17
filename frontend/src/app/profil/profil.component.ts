import { Component, OnInit } from '@angular/core';
import { RateService } from "../shared/rate.service";
import {Rate} from "../shared/rate"
import { coerceStringArray } from '@angular/cdk/coercion';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  rates!: Rate[];
  ratesOfUser!: Rate[];
  user_idConnected = sessionStorage.getItem("id");

  constructor(public rateService:RateService ) { }

  ngOnInit(): void {
    
    // this.getAllRates();
    this.getAllUserRates();
  }

  getUserId(){
    return sessionStorage.getItem("id");
  }
  getFullName(){
    return sessionStorage.getItem("fullname");
  }
  getLogin(){
    return sessionStorage.getItem("login");
  }
  getAllRates(){
    this.rateService.getRates().subscribe((response: any) => {
      console.log(response);
      this.rates = response as Rate[];
      
      this.rates.forEach(rate => {
        if(rate.user_id == sessionStorage.getItem("id")){
          this.rateService.rates = rate as Rate[];
          console.log(this.rateService.rates);
        }
      });
      
    });  
  }

  getAllUserRates(){
    let formData = new FormData();
    formData.append('user_id',this.user_idConnected!);
    this.rateService.getUserRates(formData).subscribe((response:any)=>{
      console.log(response);
    })

  }


}
