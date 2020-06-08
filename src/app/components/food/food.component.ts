import { Food } from './../../models/food.model';
import { FoodService } from './../../services/food.service';
import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddFoodComponent } from '../add-food/add-food.component';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'category', 'description'];
  dataSource: MatTableDataSource<Food>;
  foods: any[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private foodService: FoodService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.foodService.getFood('J0g4w7MqxkRhaEA81QnwXey23s02').subscribe((data) => {
      this.foods = [];
      data.forEach((element) => {
        this.foods.push(element.payload.doc.data());
        console.log(element.payload.doc.data());
      });
      this.dataSource = new MatTableDataSource(this.foods);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddFoodComponent, {
      data: {name: 'yoo'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
