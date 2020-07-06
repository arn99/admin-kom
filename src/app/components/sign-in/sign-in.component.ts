import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  loadDialog: any;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
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
    this.formSubmitAttempt = false;
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
}
