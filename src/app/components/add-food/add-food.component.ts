import { AuthService } from 'src/app/services/auth.service';
import { LoadingComponent } from './../loading/loading.component';
import { DataService } from './../../services/data.service';
import { Component, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Food } from 'src/app/models/food.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodService } from 'src/app/services/food.service';
import * as firebase from 'firebase';
import { SuccessModalComponent } from '../success-modal/success-modal.component';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent {

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
    @Inject(MAT_DIALOG_DATA) public data) {
      this.prepareForm();
      if (this.data) {
        this.updateForm(data);
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  openDialog(): void {
    this.dialog.open(LoadingComponent, {
    });
  }

  updateForm(data) {
    this.foodForm.controls['category'].setValue(data.category);
    this.foodForm.controls['description'].setValue(data.description);
    this.foodForm.controls['name'].setValue(data.name);
    this.foodForm.controls['price'].setValue(data.price);
  }
  prepareForm() {
    this.foodForm = this.formBuilder.group({
      category: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      description: ['', Validators.minLength(5)],
      name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      price: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      imagePath: ['', Validators.required],
    });
  }

  resetForm(form: FormGroup) {
    this.prepareForm();
  }
  updateFood(food) {
    this.data.name = food.name;
    this.data.price = food.price;
    this.data.description = food.description;
    this.data.category = food.category;
    this.openDialog();

    try {
      this.foodService.updateFood(this.data).then((result) => {
          this.openDialogSuccess( {message: 'Plat mise à jour avec succès',
            key: '',
            thanks: ''});
      }).catch(() => {
        this.dialog.closeAll();
        alert('erreur de mise à jour');
      }) ;
    } catch (error) {
      this.dialog.closeAll();
      alert('erreur de mise à jour');
    }
  }
  onSubmit(customerData) {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser['token'] === undefined) {
      alert('Activez la notification avant de continuer');
    } else {
      this.openDialog();
      this.file = (<HTMLInputElement>document.getElementById('file')).files[0];
      const thisRef = this.storage.ref('foods/images/' + this.file.name);
      thisRef.put(this.file).then(snapshot => {
            return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
        })
        .then(downloadURL => {
          if (currentUser !== null) {
            const food = {
            category : customerData['category'],
            name : customerData['name'],
            description : customerData['description'],
            price : customerData['price'],
            id : this.dataService.Genkey(8),
            imagePath: downloadURL,
            restaurant: currentUser.displayName,
            token: currentUser['token'],
            user: currentUser.uid
          };
            this.foodService.createFood(food);
            this.openDialogSuccess( {message: 'Plat ajouter avec succès',
              key: '',
              thanks: ''});
            this.foodForm.reset();
          } else {
          }
        }).catch(error => {
          console.log(error);
        });
    }
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
  openDialogSuccess(data): void {
    const dialogRef = this.dialog.open(SuccessModalComponent, {
      width: '85%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialog.closeAll();
    });
  }
}
