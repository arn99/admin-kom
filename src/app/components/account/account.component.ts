import { UserInterface } from './../../models/user.model';
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { District } from '../../models/district.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
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
export class AccountComponent {
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
        uid: userData['uid'],
        email: userData['email'],
        phoneNumber: userData['phoneNumber'],
        displayName: userData['displayName'],
        district: userData['district'],
        emailVerified: userData['emailVerified'],
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

  private _filterDistricts(value: string): District[] {
    const filterValue = value.toLowerCase();
    return this.districts.filter(district => district.name.toLowerCase().indexOf(filterValue) === 0);
  }
  getDistrict(district: District) {
    try {
      if (district && district.name) {
        this.district = district.name;
        return this.district;
      } else {
      }
    } catch (error) {
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
        if (district === '' || district === 'none') {
          alert('Selectionnez votre lieu de livraison');
        } else {
          // send order
          const user = {
            uid: this.user.uid,
            displayName: restoName,
            phoneNumber: phoneNumber,
            district: this.district['name'],
            email: this.user.email,
            emailVerified: this.user.emailVerified
          };
          try {
            this.authService.SetUserData(user).then( result => {
              this.openDialogSuccess( {message: 'Votre compte a été Modifier avec succès',
              key: '',
              thanks: ''});
            }).catch( error => {
              this.dialog.closeAll();
            });
          } catch (error) {
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
    this.dialog.open(LoadingComponent, {
    });


  }
  openDialogSuccess(data): void {
    const dialogRef = this.dialog.open(SuccessModalComponent, {
      width: '85%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialog.closeAll();
    });
  }

}
