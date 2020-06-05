import { MapsComponent } from '../maps/maps.component';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../../models/order.model';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-backorder',
  templateUrl: './backorder.component.html',
  styleUrls: ['./backorder.component.css']
})
export class BackorderComponent implements OnInit, OnDestroy {

  id: number;
  order: any = {};
  orders: any[];
  ordersSubscription: Subscription;
  searchInput: string;
  page: number;
  pageSize: number;
  config: any;
  constructor(private ordersService: OrderService, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    this.ordersSubscription = this.ordersService.ordersSubject.subscribe(
      (orders) => {
        this.orders = Object.values(orders);
        console.log(Object.keys(orders));
      }
    );
    this.ordersService.emitOrders();
    this.page = 1;
    this.table();
    const uid = firebase.auth().currentUser;
    console.log(uid.uid);
  }
  table() {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.pageSize
    };
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  onViewOrder(order, id) {
    this.order = order;
    this.id = id;
    console.log(Object(this.order));
  }
  finish(id) {
    this.orders.splice(this.id, 1);
  }
  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
  }
  openDialog(location): void {
    const dialogRef = this.dialog.open(MapsComponent, {
      width: '75%',
      data: {latitude: location.latitude, longitude: location.longitude}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
