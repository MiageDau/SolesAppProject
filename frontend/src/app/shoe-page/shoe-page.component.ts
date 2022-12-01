import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../shared/shoe.service';
import { RateService } from "../shared/rate.service";
import { Rate } from "../shared/rate";
import { Shoe } from '../shared/shoe';

@Component({
  selector: 'app-shoe-page',
  templateUrl: './shoe-page.component.html',
  styleUrls: ['./shoe-page.component.css']
})
export class ShoePageComponent implements OnInit {
  
  shoe_id!: String
  urlPictureShoe!:String
  brandName!: String
  shoeName!: String 
  numberOfRate!: Number
  rates!: Rate[]
  amortiGradeAverage!: String
  amortiGradeAverageSlider!: Number

  confortGradeAverage!: String
  confortGradeAverageSlider!: Number

  durabiliteGradeAverage!: String
  durabiliteGradeAverageSlider!: Number

  designGradeAverage!: String
  designGradeAverageSlider!: Number

  maintienGradeAverage!: String
  maintienGradeAverageSlider!: Number

  gripGradeAverage!: String
  gripGradeAverageSlider!: Number

  totalGrade!: String

  badgeColor!: String

  constructor(public shoeService: ShoeService, public rateService: RateService) { }

  ngOnInit(): void {

    this.getShoeInformation();
    this.getRates();
    this.getRateAmortiOfTheShoe();
    this.getRateConfortOfTheShoe();
    this.getRateDurabiliteOfTheShoe();
    this.getRateDesignOfTheShoe();
    this.getRateMaintienOfTheShoe();
    this.getRateGripOfTheShoe();
    this.getTotalGradeOfShoe();
  }




  getShoeInformation() {
    let url = window.location.href;
    let _id = url.substr(27)
    this.shoeService.getShoeInformation(_id).subscribe((response: any) => {
      this.shoeService.selectedShoe = response;
      // console.log(response);
      //On stock dans nos variables le nom et la marque de la chaussures
      
      this.brandName = response.brandName;
      this.shoeName = response.shoeName;
      this.urlPictureShoe = response.image;
      this.shoe_id = _id;

    })
  }

  getRates() {
    this.rateService.getRates().subscribe((response: any) => {
      this.rateService.rates = response as Rate[];
      this.rates = response;
    })
  }


  //Fonction permettant de calculer l'amorti moyen de la chaussure.
  getRateAmortiOfTheShoe() {
    let amortiGradeShoeAverage;
    let shoe_id = window.location.href.substr(27);
    let rateOfShoe: any = [];

    this.rateService.getRates().subscribe((response: any) => {
      this.rateService.rates = response as Rate[];
      // console.log(response);
      response.forEach((shoe: any) => {
        if (shoe.shoe_id == shoe_id) {
          rateOfShoe.push(shoe);
        }
      });
      // console.log(rateOfShoe);
      this.numberOfRate = rateOfShoe.length;
      let amortiGradeTable: any = [];
      rateOfShoe.forEach((element: any) => {
        amortiGradeTable.push(element.amortiGrade);
      });
      const lengthOfAmortiGradeTable = amortiGradeTable.length;
      const initialValue = 0;
      const sumForAmortiGradeTable = amortiGradeTable.reduce(
        (previousValue: any, currentValue: any) => previousValue + currentValue,
        initialValue
      );
      // console.log(sumForAmortiGradeTable);
      amortiGradeShoeAverage = sumForAmortiGradeTable / lengthOfAmortiGradeTable
      this.amortiGradeAverage = amortiGradeShoeAverage.toFixed(2);
      this.amortiGradeAverageSlider = amortiGradeShoeAverage * 10;
    })
  }

  //Fonction permettant de calculer le confort moyen de la chaussure.
  getRateConfortOfTheShoe() {
    let confortGradeShoeAverage;
    let shoe_id = window.location.href.substr(27);
    let rateOfShoe: any = [];

    this.rateService.getRates().subscribe((response: any) => {
      this.rateService.rates = response as Rate[];
      // console.log(response);
      response.forEach((shoe: any) => {
        if (shoe.shoe_id == shoe_id) {
          rateOfShoe.push(shoe);
        }
      });
      // console.log(rateOfShoe);
      let confortGradeTable: any = [];
      rateOfShoe.forEach((element: any) => {
        confortGradeTable.push(element.confortGrade);
      });
      const lengthOfconfortGradeTable = confortGradeTable.length;
      const initialValue = 0;
      const sumForconfortGradeTable = confortGradeTable.reduce(
        (previousValue: any, currentValue: any) => previousValue + currentValue,
        initialValue
      );
      // console.log(sumForconfortGradeTable);
      confortGradeShoeAverage = sumForconfortGradeTable / lengthOfconfortGradeTable
      this.confortGradeAverage = confortGradeShoeAverage.toFixed(2);
      this.confortGradeAverageSlider = confortGradeShoeAverage * 10;
    })
  }

  //Fonction permettant de calculer la durabilité moyen de la chaussure.
  getRateDurabiliteOfTheShoe() {
    let durabiliteGradeShoeAverage;
    let shoe_id = window.location.href.substr(27);
    let rateOfShoe: any = [];

    this.rateService.getRates().subscribe((response: any) => {
      this.rateService.rates = response as Rate[];
      // console.log(response);
      response.forEach((shoe: any) => {
        if (shoe.shoe_id == shoe_id) {
          rateOfShoe.push(shoe);
        }
      });
      // console.log(rateOfShoe);
      let durabiliteGradeTable: any = [];
      rateOfShoe.forEach((element: any) => {
        durabiliteGradeTable.push(element.durabiliteGrade);
      });
      const lengthOfdurabiliteGradeTable = durabiliteGradeTable.length;
      const initialValue = 0;
      const sumFordurabiliteGradeTable = durabiliteGradeTable.reduce(
        (previousValue: any, currentValue: any) => previousValue + currentValue,
        initialValue
      );
      // console.log(sumFordurabiliteGradeTable);
      durabiliteGradeShoeAverage = sumFordurabiliteGradeTable / lengthOfdurabiliteGradeTable
      this.durabiliteGradeAverage = durabiliteGradeShoeAverage.toFixed(2);
      this.durabiliteGradeAverageSlider = durabiliteGradeShoeAverage * 10;
    })
  }
  //Fonction permettant de calculer le design moyen de la chaussure.
  getRateDesignOfTheShoe() {
    let designGradeShoeAverage;
    let shoe_id = window.location.href.substr(27);
    let rateOfShoe: any = [];

    this.rateService.getRates().subscribe((response: any) => {
      this.rateService.rates = response as Rate[];
      // console.log(response);
      response.forEach((shoe: any) => {
        if (shoe.shoe_id == shoe_id) {
          rateOfShoe.push(shoe);
        }
      });
      // console.log(rateOfShoe);
      let designGradeTable: any = [];
      rateOfShoe.forEach((element: any) => {
        designGradeTable.push(element.designGrade);
      });
      const lengthOfdesignGradeTable = designGradeTable.length;
      const initialValue = 0;
      const sumFordesignGradeTable = designGradeTable.reduce(
        (previousValue: any, currentValue: any) => previousValue + currentValue,
        initialValue
      );
      // console.log(sumFordesignGradeTable);
      designGradeShoeAverage = sumFordesignGradeTable / lengthOfdesignGradeTable
      this.designGradeAverage = designGradeShoeAverage.toFixed(2);
      this.designGradeAverageSlider = designGradeShoeAverage * 10;
    })
  }

  //Fonction permettant de calculer le maintien moyen de la chaussure.
  getRateMaintienOfTheShoe() {
    let maintienGradeShoeAverage;
    let shoe_id = window.location.href.substr(27);
    let rateOfShoe: any = [];

    this.rateService.getRates().subscribe((response: any) => {
      this.rateService.rates = response as Rate[];
      // console.log(response);
      response.forEach((shoe: any) => {
        if (shoe.shoe_id == shoe_id) {
          rateOfShoe.push(shoe);
        }
      });
      // console.log(rateOfShoe);
      let maintienGradeTable: any = [];
      rateOfShoe.forEach((element: any) => {
        maintienGradeTable.push(element.maintienGrade);
      });
      const lengthOfmaintienGradeTable = maintienGradeTable.length;
      const initialValue = 0;
      const sumFormaintienGradeTable = maintienGradeTable.reduce(
        (previousValue: any, currentValue: any) => previousValue + currentValue,
        initialValue
      );
      // console.log(sumFormaintienGradeTable);
      maintienGradeShoeAverage = sumFormaintienGradeTable / lengthOfmaintienGradeTable
      this.maintienGradeAverage = maintienGradeShoeAverage.toFixed(2);
      this.maintienGradeAverageSlider = maintienGradeShoeAverage * 10;
    })
  }

    //Fonction permettant de calculer l'adhérence moyenne de la chaussure.
    getRateGripOfTheShoe() {
      let gripGradeShoeAverage;
      let shoe_id = window.location.href.substr(27);
      let rateOfShoe: any = [];
  
      this.rateService.getRates().subscribe((response: any) => {
        this.rateService.rates = response as Rate[];
        // console.log(response);
        response.forEach((shoe: any) => {
          if (shoe.shoe_id == shoe_id) {
            rateOfShoe.push(shoe);
          }
        });
        // console.log(rateOfShoe);
        let gripGradeTable: any = [];
        rateOfShoe.forEach((element: any) => {
          gripGradeTable.push(element.gripGrade);
        });
        const lengthOfgripGradeTable = gripGradeTable.length;
        const initialValue = 0;
        const sumForgripGradeTable = gripGradeTable.reduce(
          (previousValue: any, currentValue: any) => previousValue + currentValue,
          initialValue
        );
        // console.log(sumForgripGradeTable);
        gripGradeShoeAverage = sumForgripGradeTable / lengthOfgripGradeTable
        this.gripGradeAverage = gripGradeShoeAverage.toFixed(2);
        this.gripGradeAverageSlider = gripGradeShoeAverage * 10;
        return this.gripGradeAverage;
      })
    }

    getTotalGradeOfShoe(){
      //Récupération des évaluation
      let shoe_id = window.location.href.substr(27);
      let rateOfShoe: any = [];
      this.rateService.getRates().subscribe((response: any) => {
        this.rateService.rates = response as Rate[];
        // console.log(response);
        response.forEach((shoe: any) => {
          //Vérification de l'id de la shoe avec celle qui est affiché
          if (shoe.shoe_id == shoe_id) {
            rateOfShoe.push(shoe);
          }
        });
        //Création des tables d'évaluation pour pouvoir calculer 
        let amortiGradeTable: any = [];
        let confortGradeTable: any = [];
        let durabiliteGradeTable: any = [];
        let designGradeTable: any = [];
        let maintienGradeTable: any = [];
        let gripGradeTable: any = [];
        rateOfShoe.forEach((element: any) => {
          amortiGradeTable.push(element.amortiGrade);
          confortGradeTable.push(element.confortGrade);
          durabiliteGradeTable.push(element.durabiliteGrade);
          designGradeTable.push(element.designGrade);
          maintienGradeTable.push(element.maintienGrade);
          gripGradeTable.push(element.gripGrade);
        });

        // Création du tableau final des notes 
        let finalGradeTable = [];
        //traitement Amorti
        let lengthOfAmortiGradeTable = amortiGradeTable.length;
        let initialValue = 0;
        let sumForAmortiGradeTable = amortiGradeTable.reduce(
          (previousValue: any, currentValue: any) => previousValue + currentValue,
          initialValue
        );
        let amortiGrade = sumForAmortiGradeTable/lengthOfAmortiGradeTable
        //traitement Confort
        let lengthOfConfortGradeTable = confortGradeTable.length;
        let sumForConfortGradeTable = confortGradeTable.reduce(
          (previousValue: any, currentValue: any) => previousValue + currentValue,
          initialValue
        );
        let ConfortGrade = sumForConfortGradeTable/lengthOfConfortGradeTable
        //traitement durabilite
        let lengthOfDurabiliteGradeTable = durabiliteGradeTable.length;
        let sumForDurabiliteGradeTable = durabiliteGradeTable.reduce(
          (previousValue: any, currentValue: any) => previousValue + currentValue,
          initialValue
        );
        let DurabiliteGrade = sumForDurabiliteGradeTable/lengthOfDurabiliteGradeTable
        //traitement design
        let lengthOfDesignGradeTable = designGradeTable.length;
        let sumForDesignGradeTable = designGradeTable.reduce(
          (previousValue: any, currentValue: any) => previousValue + currentValue,
          initialValue
        );
        let DesignGrade = sumForDesignGradeTable/lengthOfDesignGradeTable
        //traitement maintien
        let lengthOfMaintienGradeTable = maintienGradeTable.length;
        let sumForMaintienGradeTable = maintienGradeTable.reduce(
          (previousValue: any, currentValue: any) => previousValue + currentValue,
          initialValue
        );
        let MaintienGrade = sumForMaintienGradeTable/lengthOfMaintienGradeTable
        //traitement grip
        let lengthOfGripGradeTable = gripGradeTable.length;
        let sumForGripGradeTable = gripGradeTable.reduce(
          (previousValue: any, currentValue: any) => previousValue + currentValue,
          initialValue
        );
        let GripGrade = sumForGripGradeTable/lengthOfGripGradeTable
        
        //Ajout des valeurs dans le tableau final pour traitement;
        finalGradeTable.push(amortiGrade);
        finalGradeTable.push(ConfortGrade);
        finalGradeTable.push(DurabiliteGrade);
        finalGradeTable.push(DesignGrade);
        finalGradeTable.push(MaintienGrade);
        finalGradeTable.push(GripGrade);

        // console.log('tab final')
        // console.log(finalGradeTable);

        
        //calcul de la note final de la chaussure
        let sizeFinal = finalGradeTable.length
        let sumFinal = finalGradeTable.reduce(
          (previousValue: any, currentValue: any) => previousValue + currentValue,
          initialValue
        );
        let totalGradeFinal = sumFinal/sizeFinal;
        // console.log('Final');
        // console.log(totalGradeFinal)

        this.totalGrade = totalGradeFinal.toFixed(2);
        
        //Gestion des couleurs d'affichage du badge
        if(this.totalGrade > "0" && this.totalGrade < "3" ){
          this.badgeColor = "danger";
        }if(this.totalGrade > "3" && this.totalGrade < "5" ){
          this.badgeColor = "warning";  
        }if(this.totalGrade > "5" && this.totalGrade < "7" ){
          this.badgeColor = "primary";
        } if(this.totalGrade>"7"){
          this.badgeColor = "success";
        }
      })
    }

}
