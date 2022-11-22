import { Component, OnInit } from '@angular/core';
import { Shoe } from '../shared/shoe';
import { ShoeService } from "../shared/shoe.service";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: 'app-shoes-page',
  templateUrl: './shoes-page.component.html',
  styleUrls: ['./shoes-page.component.css']
})
export class ShoesPageComponent implements OnInit {

  rateButtonValue!: String;
  constructor(public shoeService: ShoeService) { }

  ngOnInit(): void {
    this.refreshShoeList();
    
  }

  refreshShoeList(){
    this.shoeService.getShoesList().subscribe((response:any)=>{
      this.shoeService.shoes = response as Shoe[];
    });
  }

  sortName(){
    // console.log(this.shoeService.shoes);
    this.shoeService.shoes.sort(function compare(a, b) {
      if (a.shoeName < b.shoeName)
         return -1;
      if (a.shoeName > b.shoeName)
         return 1;
      return 0;
      
    });
    // console.log(this.shoeService.shoes);
}
sortBrand(){
  // console.log(this.shoeService.shoes);
  this.shoeService.shoes.sort(function compare(a, b) {
    if (a.brandName < b.brandName)
       return -1;
    if (a.brandName > b.brandName)
       return 1;
    return 0;
  });
  // console.log(this.shoeService.shoes);
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
