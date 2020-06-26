import { MapsComponent } from '../maps/maps.component';
import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-backorder',
  templateUrl: './backorder.component.html',
  styleUrls: ['./backorder.component.css']
})
export class BackorderComponent implements OnInit {

  id: number;
  order: any = {};
  orders: any[];
  displayedColumns: string[] = ['name', 'adresse', 'Action'];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private ordersService: OrderService, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    const uid = firebase.auth().currentUser;
    this.getOrders();
  }
  getOrders() {
    this.ordersService.getOrders('J0g4w7MqxkRhaEA81QnwXey23s02').subscribe((data) => {
      this.orders = [];
      data.forEach((element) => {
        // tslint:disable-next-line:no-shadowed-variable
        const data = element.payload.doc.data();
        data['docId'] = element.payload.doc.id;
        this.orders.push(data);
      });
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  onViewOrder(order) {
    this.order = order;
    console.log(Object(this.order));
  }
  finish(order, index) {
    order['state'] = 'ready';
    try {
      console.log(order);
      this.openLoadDialog();
      this.ordersService.updateOrder(order).then((result) => {
        console.log(result);
          this.dialog.closeAll();
          alert('commande traiter avec succès');
      }).catch(() => {
        this.dialog.closeAll();
        alert('erreur yoo');
      }) ;
    } catch (error) {
      this.dialog.closeAll();
      alert('erreur');
    }
  }
  openDialogLocation(location): void {
    const dialogRef = this.dialog.open(MapsComponent, {
      width: '75%',
      data: {latitude: location.latitude, longitude: location.longitude}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openLoadDialog(): void {
    const dialogRef = this.dialog.open(LoadingComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
