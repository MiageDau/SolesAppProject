import { Component, OnInit } from '@angular/core';
import { ShoeService } from "../shared/shoe.service";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  constructor(public shoeService:ShoeService) { }

  ngOnInit(): void {
    window.addEventListener('load',()=>{
      this.getShoeInformation();
    });
    
  }
  getShoeInformation(){
    let url = window.location.href;
    let _id = url.substr(29)
    this.shoeService.getShoeInformation(_id).subscribe((response:any)=>{
      this.shoeService.selectedShoe = response; 
      console.log(response);   
    })
  }
  onSubmit(){
    console.log('cliquer');
  }

}
