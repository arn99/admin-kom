import { OrderService } from './../../services/order.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-progess-bar-modal',
  templateUrl: './progess-bar-modal.component.html',
  styleUrls: ['./progess-bar-modal.component.css']
})
export class ProgessBarModalComponent {
  firstStep: string;
  secondStep: string;
  thirdStep: string;
  orderId: string;
  order: any;
  constructor(public dialogRef: MatDialogRef<ProgessBarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private orderService: OrderService ) {
    this.orderId = data.id;
    orderService.getOrderById(this.orderId).subscribe( async result => {
      switch (result['state']) {
        case 'waiting':
          this.firstStep = 'is-active';
          this.secondStep = '';
          this.thirdStep = '';
          break;
        case 'ready':
          this.firstStep = 'is-complete';
          this.secondStep = 'is-active';
          this.thirdStep = '';
          break;
        default:
          this.secondStep = 'is-complete';
          this.firstStep = 'is-complete';
          this.thirdStep = '';
          break;
      }

    });
  }

}
