import { Component, OnInit } from '@angular/core';
import { RateService } from "../shared/rate.service";
import { Rate } from "../shared/rate"
import { AuthService } from "../shared/auth.service";
import { ShoeService } from "../shared/shoe.service";
import { Observable } from "rxjs";
import { NgForm } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { DialogUpdateRateComponent } from '../dialog-update-rate/dialog-update-rate.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  rates!: Rate[];
  ratesOfUser!: Rate[];
  
  user_idConnected = sessionStorage.getItem("id");

  constructor(public rateService: RateService, public authService: AuthService, public shoeService: ShoeService, public dialog:MatDialog) { }

  ngOnInit(): void {

    // this.Rates$ = this.rateService.getUserRates();
    this.getAllRates();
  }

  getUserId() {
    return sessionStorage.getItem("id");
  }
  getFullName() {
    // return this.authService.connectedUser.fullname;
    return sessionStorage.getItem("fullname");
  }
  getLogin() {
    // return this.authService.connectedUser.login;
    return sessionStorage.getItem("login");
  }
  getAllRates() {
    let ratesOfUser: any = [];
    let allRates = this.rateService.getRates();
    let user_id = sessionStorage.getItem('id');
    allRates.forEach((rates: any) => {
      rates.forEach((rate: any) => {
        if (rate.user_id == user_id) {
          ratesOfUser.push(rate);
        }
      });
    });
    this.ratesOfUser = ratesOfUser;

    console.log(this.ratesOfUser);
  }

  getShoeNameFromId(shoe_id: any) {
    this.shoeService.getShoeInformation(shoe_id).subscribe((response: any) => {
      response.shoeName;
    });
  }


  openDialog(rate: Rate){
    this.rateService.selectedRate = rate;
    let dialogRef = this.dialog.open(DialogUpdateRateComponent,{data : {rate_id : this.rateService.selectedRate._id,
                                                                        shoe_name : this.rateService.selectedRate.shoe_name,
                                                                        shoe_id : this.rateService.selectedRate.shoe_id,
                                                                        user_id : this.rateService.selectedRate.user_id,
                                                                        }
                                                                });
    dialogRef.afterClosed().subscribe((response:any)=>{
      console.log(this.rateService.selectedRate)
      console.log(response);

    })
    

  }

  onEdit(rate: Rate) {

    console.log("clicker edit");
    this.rateService.selectedRate = rate;

    let amortiGradeValue = (<HTMLInputElement>document.getElementById('amortiGrade')).value;
    let confortGradeValue = (<HTMLInputElement>document.getElementById('confortGrade')).value;
    let designGradeValue = (<HTMLInputElement>document.getElementById('designGrade')).value;
    let durabiliteGradeValue = (<HTMLInputElement>document.getElementById('durabiliteGrade')).value;
    let gripGradeValue = (<HTMLInputElement>document.getElementById('gripGrade')).value;
    let maintienGradeValue = (<HTMLInputElement>document.getElementById('maintienGrade')).value;

    let updatedRate = {
      shoe_id : this.rateService.selectedRate.shoe_id,
      user_id : this.rateService.selectedRate.user_id,
      shoe_name : this.rateService.selectedRate.shoe_name,
      amortiGrade : amortiGradeValue,
      confortGrade : confortGradeValue,
      durabiliteGrade : designGradeValue,
      designGrade : durabiliteGradeValue,
      maintienGrade : maintienGradeValue,
      gripGrade : gripGradeValue
    }

    console.log(updatedRate);
    // if (confirm('You want to update your rate about the shoe name : '+rate.shoe_name+' ?') == true) {
    //   amortiGrade.textContent = this.rateService.selectedRate.amortiGrade;
    // }
    console.log(this.rateService.selectedRate);


    this.rateService.selectedRate.amortiGrade;



    console.log(this.rateService.selectedRate.amortiGrade);



  }

  onDelete(rate_id: any) {
    if (confirm('Are you sure to delete this shoe ?') == true) {
      this.rateService.deleteRate(rate_id).subscribe(() => {
        window.location.reload();
      });
    }
  }

}

