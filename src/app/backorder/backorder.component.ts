import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../models/order.model';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';

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
  constructor(private ordersService: OrderService) { }

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

}
