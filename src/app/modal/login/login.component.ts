import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth-service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('email_login') email!: ElementRef;
  @ViewChild('password_login') password!: ElementRef;


  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {}

  openModal() {
    $(this.myModal.nativeElement).modal('show');
  }
  
  closeModal() {
    $(this.myModal.nativeElement).modal('hide');
  }

  onSubmit(): void {
    const login_email: string = this.email?.nativeElement.value;
    const login_password: string = this.password?.nativeElement.value;
    console.log("nilai email_login saat ini:", login_email);
    this.authService.login(login_email, login_password).subscribe(
      () => {
      $(this.myModal.nativeElement).modal('hide');
      this.router.navigate(['/statement']);
      this.toastr.success('Login Success')
    },
    
    (error) => {
      console.log('Login failed:', error.error);
      this.toastr.error('Login failed. Please check your email and password and try again.');
    });
  }
}
