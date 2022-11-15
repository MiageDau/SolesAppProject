import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoeService } from "../shared/shoe.service";
import { RateService } from "../shared/rate.service";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  providers: [RateService]
})
export class RatingComponent implements OnInit {

  constructor(public shoeService:ShoeService, public rateService:RateService, public authService:AuthService) { }

  ngOnInit(): void {
    this.getShoeInformation();
  }

  
  getShoeInformation(){
    let url = window.location.href;
    let _id = url.substr(29)
    this.shoeService.getShoeInformation(_id).subscribe((response:any)=>{
      this.shoeService.selectedShoe = response; 
      console.log(response);   
    })
  }

  onSubmit(form?: NgForm){
    let shoe_id = (<HTMLInputElement>document.getElementById("shoe_id")).value;
    let user_id = sessionStorage.getItem("id");
    let amortiGrade = document.getElementById('amortiGrade')?.attributes[20].value;
    let confortGrade = document.getElementById('confortGrade')?.attributes[20].value;;
    let durabiliteGrade = document.getElementById('durabiliteGrade')?.attributes[20].value;;
    let designGrade = document.getElementById('designGrade')?.attributes[20].value;;
    let maintienGrade = document.getElementById('maintienGrade')?.attributes[20].value;;
    let gripGrade = document.getElementById('gripGrade')?.attributes[20].value;;
    
    let rateObject = {
      shoe_id : shoe_id,
      user_id : user_id,
      amortiGrade: amortiGrade,
      confortGrade: confortGrade,
      durabiliteGrade: durabiliteGrade,
      designGrade: designGrade,
      maintienGrade: maintienGrade,
      gripGrade: gripGrade
    };

    this.rateService.postRate(rateObject).subscribe((response:any)=>{
      console.log(response);
    })
    
  }
  


}
