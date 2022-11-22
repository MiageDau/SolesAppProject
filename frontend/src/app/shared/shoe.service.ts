import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Shoe } from "./shoe";

@Injectable({
  providedIn: 'root'
})
export class ShoeService {

  selectedShoe! : Shoe;
  shoes! : Shoe[]; 
  readonly baseUrl = 'http://localhost:3000/shoes'
  constructor(private http: HttpClient) { }

  postShoe(shoe: any){
    return this.http.post(this.baseUrl,shoe);
  }

  // postShoe(shoe: Shoe){
  //   return this.http.post(this.baseUrl,shoe);
  // }

  getShoesList(){
    return this.http.get(this.baseUrl);
  }

  putShoe(shoe:Shoe){
    return this.http.put(this.baseUrl+ `/${shoe._id}`, shoe);
  }

  deleteShoe(_id:String){
    return this.http.delete(this.baseUrl+`/${_id}`);
  }
  getShoeInformation(_id:string){
    return this.http.get(this.baseUrl+`/${_id}`);
  }
  
}
