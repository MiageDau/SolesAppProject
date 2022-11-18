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
    this.rateService.putRate(updatedRate).subscribe((response:any)=>{
      console.log(response);
      window.location.reload();
    })
    
  }

}
