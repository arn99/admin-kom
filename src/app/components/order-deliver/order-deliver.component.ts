import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/models/order.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../loading/loading.component';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { LocalStorage } from 'src/app/utils/local-storage';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-order-deliver',
  templateUrl: './order-deliver.component.html',
  styleUrls: ['./order-deliver.component.css']
})
export class OrderDeliverComponent {

  id: number;
  order: any = {};
  orders: any[];
  displayedColumns: string[] = ['name', 'adresse', 'restaurant', 'Action'];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private localStorage: Storage;
  constructor(private ordersService: OrderService, public dialog: MatDialog) {
    this.localStorage = new LocalStorage();
                AppComponent.isBrowser.subscribe(isBrowser => {
                  if (isBrowser) {
                    this.localStorage = localStorage;
                  }
                });
    this.getOrders();
  }
  getOrders() {
    this.openLoadDialog();
    const currentUser = JSON.parse(this.localStorage.getItem('user'));
    if (currentUser !== null) {
      this.ordersService.getDelivererOrders().subscribe((data) => {
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
      this.dialog.closeAll();
      });
    } else {
      this.dialog.closeAll();
    }
  }
  onViewOrder(order) {
    this.order = order;
  }
  finish(order) {
    order['state'] = 'delivering';
    try {
      this.openLoadDialog();
      this.ordersService.updateOrder(order).then(() => {
      }).catch(() => {
        this.dialog.closeAll();
        alert('erreur yoo');
      }) ;
    } catch (error) {
      this.dialog.closeAll();
      alert('erreur');
    }
  }

  openLoadDialog(): void {
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
