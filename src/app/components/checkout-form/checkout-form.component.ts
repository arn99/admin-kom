import { SuccessModalComponent } from './../success-modal/success-modal.component';
import { OrderService } from './../../services/order.service';
import { Food } from 'src/app/models/food.model';
import { LocationData } from './../../models/location-data';
import * as Districts from './../../models/district.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Customer } from 'src/app/models/customer.model';
import { DataService } from 'src/app/services/data.service';
import { LocalService } from 'src/app/services/local.service';
import { District } from './../../models/district.model';
import { LocalStorage } from 'src/app/utils/local-storage';
import { AppComponent } from 'src/app/app.component';
import { FoodService } from 'src/app/services/food.service';
@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {
  form: FormGroup;
  public checkOutInvalid: boolean;
  private formSubmitAttempt: boolean;
  districtControl = new FormControl();
  filteredDistricts: Observable<District[]>;
  districts: District[]  = Districts.districts;
  district: string;
  livraison = 0;
  private localStorage: Storage;
  constructor(public dialogRef: MatDialogRef<CheckoutFormComponent>,
    public foodService: FoodService,
    @Inject(MAT_DIALOG_DATA) public data: any [],
    private fb: FormBuilder,
    private orderService: OrderService,
    public dataService: DataService,
    private localService: LocalService,
    public dialog: MatDialog
    ) {
      this.localStorage = new LocalStorage();
    AppComponent.isBrowser.subscribe(isBrowser => {
      if (isBrowser) {
        this.localStorage = localStorage;
      }
    });
      this.form = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        payment: ['', [Validators.required]],
        numero: ['', [Validators.required, Validators.maxLength(9), Validators.pattern('[0-9]{8}')]]
      });
      this.districtControl.setValidators([Validators.required]);
      this.filteredDistricts = this.districtControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterDistricts(name) : this.districts.slice())
      );
    }

  ngOnInit(): void {
    this.getLivraisonPrice();
  }
  private _filterDistricts(value: string): District[] {
    const filterValue = value.toLowerCase();
    return this.districts.filter(district => district.name.toLowerCase().indexOf(filterValue) === 0);
  }
  onNoClick(): void {
    this.dialogRef.close('none');
  }
  getDistrict(district: District) {
    try {
      if (district && district.name) {
        this.district = district.name;
        return this.district;
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
      this.district = '';
    }
    return this.district;
  }
  getLivraisonPrice() {
    this.data.forEach( item => this.livraison = this.findWithAttr(this.data, 'restaurant', item['restaurant']));
  }
  findWithAttr(array, attr, value): number {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] !== value) {
            return 1500;
        }
    }
    return 1000;
  }
  async onSubmit() {
    this.checkOutInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const numero = this.form.get('numero').value;
        const payment = this.form.get('payment').value;
        const district = this.district['name'];
        if (district === '' || district === 'none') {
          alert('Selectionnez votre lieu de livraison');
        } else {
          // send order
          const customer: Customer = { name: username, numero: numero };
          const clientLocation: LocationData = { latitude: 0, longitude: 0, district: district };
          const food: Food = {
                                id: this.dataService.Genkey(11),
                                name: '', price: 2,
                                imagePath: 'yoo',
                                category: 'test',
                                description: 'test',
                                restaurant: 'resto',
                                numberOfItem: 10
                              };
          try {
            this.data.forEach((item) => {
              const data = {
                  clientLocation: clientLocation,
                  customer: customer,
                  food: item,
                  paymentState: payment,
                  date: Date.now(),
                  state: 'waiting',
                  total: (item.price * item.numberOfItem),
                  livraison: this.livraison,
                  restaurant: {
                              id : item['user'],
                              name: item.restaurant
                            }
              };
              let orderNumber;
              try {
                 this.orderService.createOrder(data).then((result) => {
                  orderNumber =  result;
                  if (orderNumber !== null) {
                    let orderTab = [];
                    if (this.localService.getJsonValue('orders') !== null) {
                      orderTab = this.localService.getJsonValue('orders');
                      const today = new Date();
                      const dd = today.getDate();
                      let ddString, mmString, todayString;
                      const mm = today.getMonth() + 1;
                      const yyyy = today.getFullYear();
                      if (dd < 10) {
                        ddString = '0' + dd;
                      }

                      if (mm < 10) {
                        mmString = '0' + mm;
                      }
                      todayString = mmString + '-' + ddString + '-' + yyyy;
                      orderTab.push({'id': orderNumber, 'date': todayString});
                    }
                    this.localService.setJsonValue('orders', orderTab);
                  } else {
                    alert('Erreur dela commander reessayez');
                  }
                }).catch(() => {
                  alert('Erreur dela commander reessayez');
                }) ;
              } catch (error) {
                console.log(error);
                alert('Erreur dela commander reessayez');
              }
            });
            this.localService.setJsonValue('test', []);
            this.openDialog( {message: 'Commande effectuer avec succes! Lidentifiant de votre commande: ',
            key: this.localService.getJsonValue('orders')[this.localService.getJsonValue('orders').length - 1].id,
            thanks: 'Merci pour la confiance'});
            this.foodService.newUpdate2(0);
          } catch (error) {
            console.log(error);
            alert('Erreur dela commander reessayez');
          }
        }
      } catch (err) {
        this.checkOutInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
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
}
