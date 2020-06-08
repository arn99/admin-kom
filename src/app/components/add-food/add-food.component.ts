import { LoadingComponent } from './../loading/loading.component';
import { DataService } from './../../services/data.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Food } from 'src/app/models/food.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodService } from 'src/app/services/food.service';
import * as firebase from 'firebase';

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
  food: Food;
  file: any;
  storage = firebase.storage();
  loadDialog: any;
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog,
    private foodService: FoodService, public dataService: DataService,
    public dialogRef: MatDialogRef<AddFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Food) {
      this.prepareForm();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  openDialog(): void {
    this.loadDialog = this.dialog.open(LoadingComponent, {
    });

    this.loadDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
    this.openDialog();
    this.foodForm.reset();
    this.file = (<HTMLInputElement>document.getElementById('file')).files[0];
    const thisRef = this.storage.ref('foods/images/' + this.file.name);
    thisRef.put(this.file).then(snapshot => {
          return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
      })
      .then(downloadURL => {
        const food = {
          category : customerData['category'],
          name : customerData['name'],
          description : customerData['description'],
          price : customerData['price'],
          id : this.dataService.Genkey(8),
          imagePath: downloadURL
        };
        const foodId = this.foodService.createFood(food);
          console.log(foodId);
          this.dialog.closeAll();
          alert('Plat ajouter avec succès');
      }).catch(error => {
        console.log(error);
      });
    }
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
