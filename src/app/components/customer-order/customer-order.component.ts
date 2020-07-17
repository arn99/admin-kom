import { ExceptionModalComponent } from './../exception-modal/exception-modal.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FoodService } from 'src/app/services/food.service';
import { LocalService } from 'src/app/services/local.service';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { ProgessBarModalComponent } from '../progess-bar-modal/progess-bar-modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent implements OnInit, OnDestroy {

  displayedColumns = ['Identifiant', 'action'];
  list: MatTableDataSource<any>;
  tab: any [];
  subscription: Subscription;
  currentUser = false;
  currentUserSubscription: Subscription;
  transactions = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];
  constructor(public authService: AuthService,
    public dialog: MatDialog, public foodService: FoodService, private localService: LocalService) {
    if (this.getLocalStorage() !== null) {
      this.list = new MatTableDataSource<Element>(this.getLocalStorage());
      this.tab = this.getLocalStorage();
      if (!this.tab) {
        this.tab = [];
      }
    }
    this.subscription = this.foodService.getOrderAddNotification().subscribe(message => {
      if (message !== null) {
        this.list = message;
        console.log(this.list);
      }
    });
  }
  ngOnInit(): void {
    this.currentUserSubscription = this.authService.getCurrentNotification().subscribe( message => {
      if (message !== null && message.roles && message.roles.includes('customer')) {
        this.currentUser = true;
      } else {
        this.currentUser = false;
      }
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
    }
    this.subscription.unsubscribe();
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(SuccessModalComponent, {
      width: '85%',
      data: { message: 'vous supprimez'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.dialog.closeAll();
    });
  }
  openDialogProgressBar(data): void {
    const dialogRef = this.dialog.open(ProgessBarModalComponent, {
      width: '85%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.dialog.closeAll();
    });
  }

  checkout() {
    this.openDialog(this.tab);
    console.log(this.tab);
  }
  removeItem(order) {
    this.checkout();
    for (let i = this.tab.length - 1; i >= 0; --i) {
      if (this.tab[i].id === order.id) {
        this.tab.splice(i, 1);
      }
    }
    this.foodService.newOrderAddNotification(this.tab);
    this.list = new MatTableDataSource<Element>(this.tab);

      this.setLocalStorage(this.tab);
  }
  getStat(order) {
    if (this.currentUser) {
      this.openDialogProgressBar(order);
    } else {
      this.openDialogEception({message: 'Vous devez creer un compte ou vous connectez pour voir l\'état de votre commande ',
      key: '',
      thanks: ''});
    }
  }
  removeOneItem() {
    console.log('yoo remove');
  }
  plusItem() {
    console.log('yoo plus');
  }
  getLocalStorage(): [] {
    // Get the user data
    const orders = this.localService.getJsonValue('orders');
    console.log(orders);
    return orders;
  }
  findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }
  setLocalStorage(data) {
    // Set the User data
    this.localService.setJsonValue('orders', data);
  }
  openDialogEception(data): void {
    const dialogRef = this.dialog.open(ExceptionModalComponent, {
      width: '85%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
