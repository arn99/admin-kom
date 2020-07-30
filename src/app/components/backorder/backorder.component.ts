import { MapsComponent } from '../maps/maps.component';
import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import {MatDialog} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoadingComponent } from '../loading/loading.component';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { NotificatonService } from 'src/app/services/notificaton.service';


@Component({
  selector: 'app-backorder',
  templateUrl: './backorder.component.html',
  styleUrls: ['./backorder.component.css']
})
export class BackorderComponent implements OnInit {

  id: number;
  order: any = {};
  orders: any[];
  currentUser: any;
  displayedColumns: string[] = ['name', 'adresse', 'Action'];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private ordersService: OrderService, public dialog: MatDialog, private notificationService: NotificatonService) {
    this.getOrders();
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }
  getOrders() {
    this.openLoadDialog('Chargement des commandes');
    if (this.currentUser !== null) {
      this.ordersService.getOrders(this.currentUser.uid).subscribe((data) => {
      this.orders = [];
      data.forEach((element) => {
        // tslint:disable-next-line:no-shadowed-variable
        const data = element.payload.doc.data();
        data['docId'] = element.payload.doc.id;
        // data.customer.number = data['customer']['number'].toSting();
        console.log(data);
        this.orders.push(data);
      });
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dialog.closeAll();
      });
    } else {
      this.dialog.closeAll();
    }
  }
  onViewOrder(order) {
    this.order = order;
  }
  finish(order, index) {
    order['state'] = 'ready';
    try {
      this.openLoadDialog();
      this.ordersService.updateOrder(order).then((result) => {
        if (order.customer.token) {
          const customer = {
            payload: {
              notification: {
                title: 'Miam!',
                body: 'Votre commande a été validé par le restaurant',
                icon: 'http://the-link-to-image/icon.png'
              }
            },
            registrationTokens: order.customer.token
          };
          this.notificationService.sendNotificationToDevice(customer);
        }
        const deliver = {
          payload: {
            notification: {
              title: 'Miam!',
              body: 'Une commande a été validé veuillez verifier pour la livraison',
              icon: 'http://the-link-to-image/icon.png'
            }
          },
          registrationTokens: ['deliver']
        };
        this.notificationService.sendNotificationToDevice(deliver);
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
      this.dialog.closeAll();
    });
  }

  openLoadDialog(message?): void {
    this.dialog.open(LoadingComponent, {
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialogSuccess(data): void {
    this.dialog.open(SuccessModalComponent, {
      width: '85%',
      data: data
    });
  }
}
