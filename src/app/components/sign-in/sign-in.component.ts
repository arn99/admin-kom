import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  loadDialog: any;
  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService) { }

  async ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });

    if (await this.authService.isLoggedIn) {
      await this.router.navigate(['back-order']);
    }
  }
  async onSubmit() {
    this.loginInvalid = false;
    if (this.form.valid) {
      try {
        this.openDialog();
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        await this.authService.SignIn(username, password);
        this.dialog.closeAll();
      } catch (err) {
        this.loginInvalid = true;
        this.dialog.closeAll();
      }
    } else {
      this.dialog.closeAll();
    }
  }
  openDialog(): void {
    this.dialog.open(LoadingComponent, {
    });
  }
}
