import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-exception-modal',
  templateUrl: './exception-modal.component.html',
  styleUrls: ['./exception-modal.component.css']
})
export class ExceptionModalComponent implements OnInit {

  message: any ;
  constructor(public dialogRef: MatDialogRef<ExceptionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
      public dialog: MatDialog) {
        this.message = data;
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    console.log('yoo fermer');
    this.dialogRef.close('none');
  }
}
