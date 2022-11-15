import { Component, OnInit } from '@angular/core';
import { Shoe } from '../shared/shoe';
import { ShoeService } from "../shared/shoe.service";

@Component({
  selector: 'app-shoes-page',
  templateUrl: './shoes-page.component.html',
  styleUrls: ['./shoes-page.component.css']
})
export class ShoesPageComponent implements OnInit {

  constructor(public shoeService: ShoeService) { }

  ngOnInit(): void {
    this.refreshShoeList();
  }

  refreshShoeList(){
    this.shoeService.getShoesList().subscribe((response:any)=>{
      this.shoeService.shoes = response as Shoe[];
    });
  }

}
