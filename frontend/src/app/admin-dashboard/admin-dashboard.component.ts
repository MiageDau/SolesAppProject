import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoeService } from "../shared/shoe.service";
import { Shoe } from "../shared/shoe";
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  providers: [ShoeService]
})
export class AdminDashboardComponent implements OnInit {
  
  @ViewChild('fileInput', {static:true}) fileupload! : ElementRef;

  constructor(public shoeService: ShoeService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshShoeList();
  }

// Fonctionne mais pas de gestion des images
  onSubmit(form?: NgForm){
    // const imageBlob = this.fileupload.nativeElement.files[0];
    // console.log(imageBlob);
    // let formData = new FormData();
    // formData.set('shoeName',form?.value.shoeName);
    // formData.set('brandName',form?.value.brandName);
    // formData.set('file',imageBlob)
    // console.log(formData);

    // console.log(form?.value);
    if(form?.value._id == ""){
      this.shoeService.postShoe(form?.value).subscribe((response:any)=>{
        this.resetForm(form);
        this.refreshShoeList();
      });
    } else {      
      this.shoeService.putShoe(form?.value).subscribe((response:any)=>{
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
      // fileInput: ""
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
