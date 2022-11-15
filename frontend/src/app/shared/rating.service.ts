import { Injectable } from '@angular/core';
import { Rating } from "./rating";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  selectedRate! : Rating;
  rates! : Rating[]; 
  readonly baseUrl = 'http://localhost:3000/rating';

  constructor(private http : HttpClient) { }

  postRate(rate: Rating){
    return this.http.post(this.baseUrl,rate);
  }
}
