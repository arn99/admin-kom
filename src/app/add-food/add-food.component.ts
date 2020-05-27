import { Component, OnInit, Inject } from '@angular/core';
import { Food } from '../models/food.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  constructor(
    public dialogRef: MatDialogRef<AddFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Food) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }
}
