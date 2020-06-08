import { Component, OnInit, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Food } from 'src/app/models/food.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  foodForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Food) {

      this.prepareForm();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }
  prepareForm() {
    this.foodForm = this.formBuilder.group({
      category: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      description: ['', Validators.minLength(5)],
      name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      price: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      // imagePath: ['', Validators.required],
    });
  }

  resetForm(form: FormGroup) {
    this.prepareForm();
  }
  onSubmit(customerData) {
    this.foodForm.reset();
    console.warn('Your order has been submitted', customerData);
  }

}
