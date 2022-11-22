import { Component, OnInit } from '@angular/core';

import { ShoeService } from "../shared/shoe.service";
import { Shoe } from '../shared/shoe';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public shoeService: ShoeService) { }

  ngOnInit(): void {
    this.refreshShoeList();
  }
  refreshShoeList(){
    this.shoeService.getShoesList().subscribe((response:any)=>{
      this.shoeService.shoes = response as Shoe[];
    });
  }

  isLogged():Boolean{
    let res = false;
    if(sessionStorage.getItem("id")){
      // console.log("Connecté")
      res = true
    }else{
      // console.log('non connecté');
    }
    return res;
  }
}