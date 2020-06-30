import { OrderService } from './../../services/order.service';
import { Food } from 'src/app/models/food.model';
import { LocationData } from './../../models/location-data';
import { FoodService } from 'src/app/services/food.service';
import { District } from './../../models/district.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Customer } from 'src/app/models/customer.model';
import { DataService } from 'src/app/services/data.service';
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
  districts: District[] = [
    {
      name: 'Balkuy',
      prix: 1000
    },
    {
      name: 'Bangpoore',
      prix: 1000
    },
    {
      name: 'Dassosgho',
      prix: 1000
    },
    {
      name: 'Hamdalaye',
      prix: 1000
    },
    {
      name: 'Kossodo',
      prix: 1000
    },
    {
      name: 'Ouaga 2000',
      prix: 1000
    },
  ];
  district: string;


  constructor(public dialogRef: MatDialogRef<CheckoutFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    public dataService: DataService
    ) {
      console.log(data);
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
  }
  private _filterDistricts(value: string): District[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.districts.filter(district => district.name.toLowerCase().indexOf(filterValue) === 0);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getDistrict(district: District) {
    try {
      if (district && district.name) {
        console.log(district.name);
        this.district = district.name;
        console.log(this.district);
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
          const data = {
              clientLocation: clientLocation,
              customer: customer,
              food: food,
              paymentState: payment,
              state: 'waiting',
              total: '1000'

          };
          console.log(data);
        }
      } catch (err) {
        this.checkOutInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
