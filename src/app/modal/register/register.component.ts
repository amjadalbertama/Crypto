import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
  // registerForm: FormGroup;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('phone') phone!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') password!: ElementRef;
  @ViewChild('confirm_password') confirmPassword!: ElementRef;

  public nameErrors: string = '';
  public emailErrors: string = '';
  public phoneErrors: string = '';
  public passwordErrors: string = '';
  public confirmErrors: string = '';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {

  }

  register(): void {
    const name: string = this.name?.nativeElement.value;
    const phone: string = this.phone?.nativeElement.value;
    const email: string = this.email?.nativeElement.value;
    const password: string = this.password?.nativeElement.value;
    const confirm_password: string = this.confirmPassword?.nativeElement.value;

    const body = {
      name: name,
      phone_number: phone,
      email: email,
      password: password,
      c_password: confirm_password
    };
    
    this.http.post(environment.apiUrl + 'register', body).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/home']);
        this.toastr.success('Register Success')
      },
      (error) => {
        console.log(error.error);
        const errorMessages = error.error;
        const errorMessageArray = Object.values(errorMessages);

        this.nameErrors = errorMessages.name ? errorMessages.name[0] : '';
        this.emailErrors = errorMessages.email ? errorMessages.email[0] : '';
        this.phoneErrors = errorMessages.phone_number ? errorMessages.phone_number[0] : '';
        this.passwordErrors = errorMessages.password ? errorMessages.password[0] : '';
        this.confirmErrors = errorMessages.c_password ? errorMessages.c_password[0] : '';

        this.toastr.error(errorMessageArray.join('\n'));
        // this.toastr.error('Register failed. Please check your data and try again.')
      }
    );
  }
}
