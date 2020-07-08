import { UserInterface } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { District } from 'src/app/models/district.model';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { startWith, map } from 'rxjs/operators';
import { LoadingComponent } from '../loading/loading.component';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import * as Districts from './../../models/district.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: UserInterface;
  loadDialog: any;
  form: FormGroup;
  public checkOutInvalid: boolean;
  districtControl = new FormControl();
  filteredDistricts: Observable<District[]>;
  districts: District[]  = Districts.districts;
  district: string;
  private formSubmitAttempt: boolean;
  constructor(public authService: AuthService, public router: Router, private fb: FormBuilder, public dialog: MatDialog) {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData !== null) {
      this.user = {
        email: userData['email'],
        phoneNumber: userData['phoneNumber'],
        displayName: userData['displayName'],
        district: userData['district'],
      };
    } else {
      this.router.navigate(['sign-up']);
    }
    this.form = this.fb.group({
      restoName: ['', [Validators.required, Validators.minLength(3)]],
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
        this.openDialog();
        const restoName = this.form.get('restoName').value;
        const phoneNumber = this.form.get('numero').value;
        const district = this.district['name'];
        console.log(this.district['name']);
        if (district === '' || district === 'none') {
          alert('Selectionnez votre lieu de livraison');
        } else {
          // send order
          this.user.uid = restoName;
          this.user.district = district;
          this.user.phoneNumber = phoneNumber;
          try {
            this.authService.SetUserData(this.user).then( result => {
              console.log(result);
              this.openDialogSuccess( {message: 'Votre compte a été Modifier avec succès',
              key: '',
              thanks: 'Nous allons vous recontacter au plus vite afin de finaliser le partenariat'});
            }).catch( error => {
              console.log(error);
              this.dialog.closeAll();
            });
          } catch (error) {
            console.log(error);
            this.dialog.closeAll();
          }
        }
      } catch (err) {
        this.checkOutInvalid = true;
        this.dialog.closeAll();
      }
    } else {
      this.formSubmitAttempt = true;
      this.dialog.closeAll();
    }
  }
  openDialog(): void {
    this.loadDialog = this.dialog.open(LoadingComponent, {
    });

    this.loadDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialogSuccess(data): void {
    const dialogRef = this.dialog.open(SuccessModalComponent, {
      width: '85%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.dialog.closeAll();
    });
  }

}
