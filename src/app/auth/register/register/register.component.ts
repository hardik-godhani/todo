import { RegisterService } from './../../../core/services/register.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUser } from './../../../core/model/user-create';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  createUser: CreateUser = new CreateUser();
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private toasterService: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem(environment.dataKey)) {
      this.route.navigate(['']);
    }
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required]],
    });
  }

  submitForm() {
    this.isLoading = true;
    if (this.registerForm.invalid) {
      for (const i in this.registerForm.controls) {
        this.registerForm.controls[i].markAsDirty();
        this.registerForm.controls[i].updateValueAndValidity();
      }
      this.isLoading = false;
      return;
    }
    let model: CreateUser = new CreateUser();
    model.email = this.val['email'].value;
    model.password = this.val['password'].value;
    model.name = this.val['name'].value;
    this.registerService.createUser(model).subscribe(
      (res: any) => {
        if (res.status == 'SUCCESS') {
          this.route.navigate(['']);
          this.toasterService.success('Registration completed! Please login now.')
        }
      },
      (err) => {}
    );
  }

  get val() {
    return this.registerForm.controls;
  }
}
