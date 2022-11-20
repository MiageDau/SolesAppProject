import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RateService } from "../shared/rate.service";
@Component({
  selector: 'app-dialog-update-rate',
  templateUrl: './dialog-update-rate.component.html',
  styleUrls: ['./dialog-update-rate.component.css']
})
export class DialogUpdateRateComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public rateService:RateService) { }

  ngOnInit(): void {
  }

  update(form: NgForm){
    
    console.log(form.value);
    let updatedRate = {
      _id:this.data.rate_id,
      shoe_id : this.data.shoe_id,
      user_id : this.data.user_id,
      shoe_name : this.data.shoe_name,
      amortiGrade : form.value.amortiGrade,
      confortGrade : form.value.confortGrade,
      durabiliteGrade : form.value.designGrade,
      designGrade : form.value.durabiliteGrade,
      gripGrade : form.value.gripGrade,
      maintienGrade : form.value.maintienGrade
    }
    console.log(updatedRate);
    if(
      updatedRate.amortiGrade == "" || updatedRate.confortGrade == "" || updatedRate.designGrade == "" ||
      updatedRate.durabiliteGrade == "" || updatedRate.gripGrade == "" || updatedRate.maintienGrade == ""

    ){
      alert("To update, you need to fill all the fields of the form...");
      
    }if(
      updatedRate.amortiGrade < 0 || updatedRate.confortGrade < 0 || updatedRate.designGrade < 0 ||
      updatedRate.durabiliteGrade < 0 || updatedRate.gripGrade < 0 || updatedRate.maintienGrade < 0
    ){
      alert("To update, you need to fill all the fields with input up to 0...");
    }
    if(
      updatedRate.amortiGrade > 10 || updatedRate.confortGrade > 10 || updatedRate.designGrade > 10 ||
      updatedRate.durabiliteGrade > 10 || updatedRate.gripGrade > 10 || updatedRate.maintienGrade > 10
    ){
      alert("To update, you need to fill all the fields with no input up to 10...");
    }
    else{
      this.rateService.putRate(updatedRate).subscribe((response:any)=>{
        console.log(response);
        window.location.reload();
      })
    }
  }

}
