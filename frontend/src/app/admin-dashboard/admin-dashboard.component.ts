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
  image?:File;
  @ViewChild('picturePath',{static:false}) picturePath? : ElementRef;

  constructor(public shoeService: ShoeService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshShoeList();
  }

  selectedFile(event:any){
    if(event.target.files.length>0){
      const file = <File>event.target.files[0];
      console.log(file);
      this.image = file;
    }
  }

// Fonctionne mais pas de gestion des images
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
  
  // onSubmit(form?: NgForm){
  //   this.shoeService.postShoe(form?.value).subscribe((response:any)=>{
  //     console.log(form);
  //   })
    
  //   // const imageBlob = this.picturePath?.nativeElement.files[0];
  //   const formData = new FormData();
  //   let shoe = {
  //       _id : form?.value._id,
  //       shoeName: form?.value.shoeName,
  //       brandName: form?.value.brandName,
  //       picture: this.image!
  //   }
  //   formData.append('_id', form?.value._id);
  //   formData.append('shoeName', form?.value.shoeName);
  //   formData.append('brandName', form?.value.brandName);
  //   formData.append('picture',this.image!, this.image!.name);
  //   console.log(formData);
  //   // this.shoeService.postShoe(formData)
  //   // formData.set('imagePath',image,'imagePath');
  //   this.shoeService.postShoe(shoe).subscribe((response:any)=>{
  //     console.log(shoe);
  //   })
  // }


  resetForm(form?: NgForm){
    if(form)
      form.reset();
    this.shoeService.selectedShoe = {
      _id: "",
      shoeName: "",
      brandName: "",
      picture: ""
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
