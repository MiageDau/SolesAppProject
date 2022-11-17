import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Rate } from "../shared/rate";
import { Observable } from "rxjs";

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

  getRates(): Observable<Rate[]>{
    return this.http.get<Rate[]>(this.baseUrl);
  }

  putRate(rate:Rate){
    return this.http.put(this.baseUrl+ `/${rate._id}`, rate);
  }

  deleteRate(_id:String){
    return this.http.delete(this.baseUrl+`/${_id}`);
  }

}
