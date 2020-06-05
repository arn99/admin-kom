import { FoodService } from './../../services/food.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.foodService.getFood('J0g4w7MqxkRhaEA81QnwXey23s02').subscribe((data) => {
      data.forEach((element) => {
        console.log(element.payload.doc.data());
      });
    });
  }


}
