import { UserInterface } from './../../models/user.model';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { District } from 'src/app/models/district.model';
import * as Districts from './../../models/district.model';
import { startWith, map } from 'rxjs/operators';
import { MyErrorStateMatcher } from 'src/app/utils/my-error-state-matcher.class';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../loading/loading.component';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
@Component({
  selector: 'app-customer-sign-up',
  templateUrl: './customer-sign-up.component.html',
  styleUrls: ['./customer-sign-up.component.css']
})
export class CustomerSignUpComponent {
  loadDialog: any;
  form: FormGroup;
  public checkOutInvalid: boolean;
  districtControl = new FormControl();
  filteredDistricts: Observable<District[]>;
  districts: District[]  = Districts.districts;
  district: string;
  private formSubmitAttempt: boolean;
  matcher = new MyErrorStateMatcher();
  constructor(public authService: AuthService, private fb: FormBuilder, public dialog: MatDialog) {
    this.form = this.fb.group({
      restoName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.maxLength(9), Validators.pattern('[0-9]{8}')]]
    },  {validator: this.checkPasswords});
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
        const email = this.form.get('email').value;
        const password = this.form.get('password').value;
        const confirmPassword = this.form.get('confirmPassword').value;
        const district = this.district['name'];
        if (district === '' || district === 'none') {
          alert('Selectionnez votre lieu de livraison');
        } else {
          // send order
          const user: UserInterface = {
            displayName: restoName,
            email: email,
            password: password,
            district: district,
            phoneNumber: phoneNumber,
            roles: ['customer']
          };
          try {
            this.authService.SignUp(user).then( result => {

              this.openDialogSuccess( {message: 'Votre compte a été creé avec succès',
              key: '',
              thanks: 'Vous pouvez vous connecter maintenant'});
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
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
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
