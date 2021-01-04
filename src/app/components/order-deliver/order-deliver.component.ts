import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/models/order.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { MapsComponent } from '../maps/maps.component';
import { LoadingComponent } from '../loading/loading.component';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { NotificatonService } from 'src/app/services/notificaton.service';

@Component({
  selector: 'app-order-deliver',
  templateUrl: './order-deliver.component.html',
  styleUrls: ['./order-deliver.component.css']
})
export class OrderDeliverComponent implements OnInit {
  cardBool = false;
  id: number;
  order: any = {};
  orders: any[];
  currentUser: any;
  displayedColumns: string[] = ['name', 'adresse', 'restaurant', 'Action'];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private ordersService: OrderService, public dialog: MatDialog, private notificationService: NotificatonService) {
    this.getOrders();
  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }
  getOrders() {
    this.openLoadDialog('Chargement des commandes');
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser !== null) {
      this.ordersService.getDeliveryCNOrder().subscribe((data) => {
        this.orders = [];
        data.orders.forEach((element) => {
          const order = element;
          order['id'] = element.id;
          order.customer.number = order['customer']['numero'];
          console.log(element);
          this.orders.push(order);
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
    this.cardBool = true;
  }
  finish(order, index) {
    order['etat'] = 'delivering';
    try {
      this.openLoadDialog();
      console.log(order);
      this.ordersService.updateCNDelivery(order).subscribe((result) => {
        console.log(result);
        if (result.success) {
          this.dialog.closeAll();
          this.openDialog( {message: 'Commande livré avec succes! L\'identifiant de votre commande: ',
              key: '',
              thanks: 'Merci pour la confiance'});
        }
        if (order.customer.token) {
          const mess = {
            body: 'Le livreur est en route avec votre commande. Environ 10mns',
            token: order.customer.token
          };
          // send notification to admin and user
          this.notificationService.sendHttpNotificationToDevice(mess);
        }
      }, err => {
        this.dialog.closeAll();
        console.log('erreur yoo');
      });
    } catch (error) {
      this.dialog.closeAll();
      alert('erreur');
    }
    this.cardBool = false;
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(SuccessModalComponent, {
      width: '85%',
      data: data
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
