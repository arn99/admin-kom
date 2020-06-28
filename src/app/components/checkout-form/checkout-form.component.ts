import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {
  form: FormGroup;
  public checkOutInvalid: boolean;
  private formSubmitAttempt: boolean;
  constructor(public dialogRef: MatDialogRef<CheckoutFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
      console.log(data);
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      numero: ['', [Validators.required, Validators.maxLength(9), Validators.pattern('[0-9]{8}')]]
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  async onSubmit() {
    this.checkOutInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const numero = this.form.get('numero').value;
        // send order
        console.log(numero);
      } catch (err) {
        this.checkOutInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
