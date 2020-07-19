import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  message: string;
  constructor(
    public dialogRef: MatDialogRef<LoadingComponent>, @Inject(MAT_DIALOG_DATA) public data) {
      this.message = data;
    }

}
