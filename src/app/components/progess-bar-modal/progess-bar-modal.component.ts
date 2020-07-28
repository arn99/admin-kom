import { OrderService } from './../../services/order.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ExceptionModalComponent } from '../exception-modal/exception-modal.component';

@Component({
  selector: 'app-progess-bar-modal',
  templateUrl: './progess-bar-modal.component.html',
  styleUrls: ['./progess-bar-modal.component.css']
})
export class ProgessBarModalComponent {
  firstStep: string;
  secondStep: string;
  thirdStep: string;
  fourth: string;
  orderId: string;
  order: any;
  constructor(public dialogRef: MatDialogRef<ProgessBarModalComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data, private orderService: OrderService ) {
    this.orderId = data.id;
    orderService.getOrderById(this.orderId).subscribe( async result => {
      try {
        if (result !== null && result !== undefined) {
          switch (result['state']) {
            case 'waiting':
              this.firstStep = 'is-active';
              this.secondStep = '';
              this.thirdStep = '';
              this.fourth = '';
              break;
            case 'ready':
              this.firstStep = 'is-complete';
              this.secondStep = 'is-active';
              this.thirdStep = '';
              this.fourth = '';
              break;
            case 'delivering':
              this.firstStep = 'is-complete';
              this.secondStep = 'is-complete';
              this.thirdStep = 'is-active';
              this.fourth = '';
              break;
            default:
              this.firstStep = 'is-complete';
              this.secondStep = 'is-complete';
              this.firstStep = 'is-complete';
              this.fourth = 'is-complete';
              break;
          }
        } else {
          this.openDialogEception('Vous devez vous connectez d\'abord');
        }
      } catch (error) {
        this.openDialogEception('erreur');
      }

    });
  }
  openDialogEception(data): void {
    this.dialog.open(ExceptionModalComponent, {
      width: '85%',
      data: data
    });
  }

}
