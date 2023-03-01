import { RegisterService } from './../../../core/services/register.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUser } from './../../../core/model/user-create';
import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

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
    private route: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem(environment.dataKey)) {
      this.route.navigate(['']);
    }
    this.registerForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required]],
      licenseId: ['', [Validators.required]],
      image: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      username: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  submitForm() {
    this.isLoading = true;
    if (this.registerService.requestedUrl == '/createUser')
      this.registerService.requestedUrl = '';
    if (this.registerForm.invalid) {
      for (const i in this.registerForm.controls) {
        this.registerForm.controls[i].markAsDirty();
        this.registerForm.controls[i].updateValueAndValidity();
      }
      this.isLoading = false;
      return;
    }
    let model: CreateUser = new CreateUser();
    model.email = this.val['Email'].value;
    model.password = this.val['Password'].value;
    model.name = this.val['name'].value;
    model.licenseId = this.val['licenseId'].value;
    model.image = this.val['image'].value;
    model.gender = this.val['gender'].value;
    model.mobile = this.val['mobile'].value;
    model.username = this.val['username'].value;
    model.role = this.val['role'].value;
    this.registerService.createUser(model).subscribe(
      (res: HttpResponse<any>) => {
        if (res) {
          // localStorage.setItem(
          //   environment.dataKey,
          //   btoa(JSON.stringify({ data: decodedData, token: res['token'] }))
          // );
          // if (this.registerService.requestedUrl) {
          //   this.route.navigate([this.registerService.requestedUrl]);
          // } else {
          //   this.route.navigate(['']);
          // }
          // this.isLoading = false;
          // this.registerForm.reset();
        }
      },
      (err) => {}
    );
  }

  get val() {
    return this.registerForm.controls;
  }
}
