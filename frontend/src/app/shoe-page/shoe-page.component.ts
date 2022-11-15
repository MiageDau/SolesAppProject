import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../shared/shoe.service';

@Component({
  selector: 'app-shoe-page',
  templateUrl: './shoe-page.component.html',
  styleUrls: ['./shoe-page.component.css']
})
export class ShoePageComponent implements OnInit {

  constructor(public shoeService:ShoeService) { }

  ngOnInit(): void {
    window.addEventListener('load',()=>{
      this.getShoeInformation();
    });
  }

  getShoeInformation(){
    let url = window.location.href;
    let _id = url.substr(27)
    this.shoeService.getShoeInformation(_id).subscribe((response:any)=>{
      this.shoeService.selectedShoe = response; 
      console.log(response);   
    })
  }

}
