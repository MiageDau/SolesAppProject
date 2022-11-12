import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
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

  constructor(public shoeService: ShoeService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshShoeList();
  }


  onSubmit(form?: NgForm){
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
      brandName: ""
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
    if(confirm('Are you sure to delete this sho ?') == true){
      this.shoeService.deleteShoe(_id).subscribe((response:any)=>{
        this.refreshShoeList();
        this.resetForm(form);
      });
    }
  }
}
