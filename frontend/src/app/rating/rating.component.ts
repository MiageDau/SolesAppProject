import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoeService } from "../shared/shoe.service";
import { RateService } from "../shared/rate.service";
import { AuthService } from "../shared/auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  providers: [RateService]
})
export class RatingComponent implements OnInit {
  shoeId! : String;
  shoeName! : String
  brandName! : String
  picturePath! : String
  isRatedByUser!: Boolean;


  constructor(public shoeService:ShoeService, private router: Router,public rateService:RateService, public authService:AuthService, public _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getShoeInformation();
    this.isAlreadyRateByUser();
    
    
  }

  isAlreadyRateByUser(){
    this.rateService.getRates().subscribe((response:any)=>{
      let shoe_id = window.location.href.substr(29);
      let user_id = sessionStorage.getItem("id");
      let endCondition = false;
      response.forEach((rate:any) => {
        if(rate.shoe_id == shoe_id && rate.user_id == user_id){
          endCondition = true;
        }else{
          
        }
      });
      this.isRatedByUser = endCondition;
      console.log(endCondition);
      console.log(this.isRatedByUser);
    })

  }

  getShoeInformation(){
    let url = window.location.href;
    let _id = url.substr(29)
    this.shoeService.getShoeInformation(_id).subscribe((response:any)=>{
      this.shoeService.selectedShoe = response; 
      this.shoeId = response._id;
      this.shoeName = response.shoeName;
      this.brandName = response.brandName;
      this.picturePath = response.image;

      // console.log(response.shoeName);   
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
      shoe_name: this.shoeName,
      amortiGrade: amortiGrade,
      confortGrade: confortGrade,
      durabiliteGrade: durabiliteGrade,
      designGrade: designGrade,
      maintienGrade: maintienGrade,
      gripGrade: gripGrade
    };

    this.rateService.postRate(rateObject).subscribe((response:any)=>{
      this._snackBar.open(' Rating with success, Thank you! ', 'Undo', {
        duration: 3000
      });  
      // console.log(response);
      this.router.navigateByUrl('/shoes');
    })

  }



  reset(form?: NgForm){
    window.location.reload();
  }


  onDelete(_id:String, form: NgForm){
    if(confirm('Are you sure to delete this shoe ?') == true){
      this.rateService.deleteRate(_id).subscribe((response:any)=>{
        this.reset(form);
      });
    }
  }
  
  


}
