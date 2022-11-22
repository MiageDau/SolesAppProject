import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoeService } from "../shared/shoe.service";
import { Shoe } from "../shared/shoe";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  providers: [ShoeService]
})
export class AdminDashboardComponent implements OnInit {
  
  @ViewChild('fileInput', {static:true}) fileupload! : ElementRef;

  constructor(public shoeService: ShoeService, public _snackBar:MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshShoeList();
  }

// Fonctionne mais pas de gestion des images
  onSubmit(form?: NgForm){
    const imageBlob = this.fileupload.nativeElement.files[0];
    const shoeName = form?.value.shoeName;
    const brandName = form?.value.brandName;
    console.log(imageBlob);
    const file = new FormData();
    file.set('file',imageBlob);
    file.set('shoeName', shoeName);
    file.set('brandName', brandName);
    
    if(form?.value._id == ""){
      
      this.shoeService.postShoe(file).subscribe((response:any) => {
        this._snackBar.open(' Shoe add with success ! ', 'Undo', {
          duration: 3000
        });  
        this.resetForm(form);
        this.refreshShoeList();
      });
    } else {      
      this.shoeService.putShoe(form?.value).subscribe((response:any)=>{
        this._snackBar.open('Shoe update with success ! ', 'Undo', {
          duration: 3000
        });  
        this.resetForm(form);
        this.refreshShoeList();
      });


    }
  }
  

  resetForm(form?: NgForm){
    if(form)
      form.reset();
    this.shoeService.selectedShoe = {
      _id: "",
      shoeName: "",
      brandName: "",
      image: ""
    }
  }

  refreshShoeList(){
    this.shoeService.getShoesList().subscribe((response:any)=>{
      this.shoeService.shoes = response as Shoe[];
    });
  }

  onEdit(shoe : Shoe){
    this.shoeService.selectedShoe = shoe;
  }

  onDelete(_id:String, form: NgForm){
    if(confirm('Are you sure to delete this shoe ?') == true){
      this.shoeService.deleteShoe(_id).subscribe((response:any)=>{
        this.refreshShoeList();
        this.resetForm(form);
      });
    }
  }

}
