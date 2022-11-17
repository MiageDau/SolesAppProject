import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Rate } from "../shared/rate";

@Injectable({
  providedIn: 'root'
})
export class RateService {
  selectedRate!:Rate;
  rates!: Rate[];
  readonly baseUrl = 'http://localhost:3000/rating';

  constructor(private http: HttpClient) { }

  postRate(rate: any){
    return this.http.post(this.baseUrl,rate);
  }
  getRates(){
    return this.http.get(this.baseUrl);
  }

  // getUserRates(user_id:any){
  //   console.log("send here "+user_id);
  //   return this.http.get(this.baseUrl+"/userRate",user_id)
  // }

  getUserRates(){
    
    return this.http.get("http://localhost:3000/islogged");
  }

}
