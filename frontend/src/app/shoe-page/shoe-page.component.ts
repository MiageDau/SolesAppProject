import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../shared/shoe.service';
import { RateService } from "../shared/rate.service";
import { Rate } from "../shared/rate";
import { Shoe } from '../shared/shoe';

@Component({
  selector: 'app-shoe-page',
  templateUrl: './shoe-page.component.html',
  styleUrls: ['./shoe-page.component.css']
})
export class ShoePageComponent implements OnInit {
  brandName!: String
  shoeName!: String

  constructor(public shoeService:ShoeService, public rateService:RateService) { }

  ngOnInit(): void {
    
    this.getShoeInformation();
    this.getRateOfTheShoe();
  }

  getShoeInformation(){
    let url = window.location.href;
    let _id = url.substr(27)
    this.shoeService.getShoeInformation(_id).subscribe((response:any)=>{
      this.shoeService.selectedShoe = response; 
      console.log(response);   
      //On stock dans nos variables le nom et la marque de la chaussures
      this.brandName = response.brandName;
      this.shoeName = response.shoeName;
    })
  }

  getRates(){
    this.rateService.getRates().subscribe((response:any)=>{
      this.rateService.rates = response as Rate[];
      return response;
    })
  }
  getRateOfTheShoe(){
    let shoe_id = window.location.href.substr(27);
    let rateOfShoe:any = [];
    this.rateService.getRates().subscribe((response:any)=>{
      this.rateService.rates = response as Rate[];
      console.log(response);
      response.forEach((shoe:any) => {
        if(shoe.shoe_id == shoe_id){
          rateOfShoe.push(shoe);
        }
      });
    })
    console.log(rateOfShoe);
    
  }  

}
