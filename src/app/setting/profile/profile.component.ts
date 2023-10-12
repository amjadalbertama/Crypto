import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  page1: boolean = true;
  page2: boolean = false;
  page3: boolean = false;

  isLoggedIn: boolean;
  dataProfile: any;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('phone') phone!: ElementRef;
  @ViewChild('no_identity') no_identity!: ElementRef;
  @ViewChild('address') address!: ElementRef;

  //kategory
  isSettingProfileActive = true;
  isAccountVerificationActive = false;
  isDocumentActive = false;

  // imageUrl: string | ArrayBuffer = '';

  // onImageSelected(event: any) {
  //   const file = event.target.files[0];
  // if (file) {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.imageUrl = reader.result;
  //   };
  // }
  // }

  constructor(
    private http: HttpClient, private router: Router, 
    private authService: AuthService, 
    private toastr: ToastrService, 
    ) {
    this.isLoggedIn = authService.isLoggedIn;
  }
  ngOnInit(): void {
    this.getDataProfile()
    // this.updateProfile()
  }

  getDataProfile(): void {
    const token = this.authService.getToken()
    const headers = { 'Authorization': 'Bearer ' + token };
    this.http.get(environment.apiUrl +'profile',{ headers },)
      .subscribe(response => {
        this.dataProfile = response;
        console.log(this.dataProfile)
        if (this.dataProfile && this.dataProfile.user) {
          // console.log(`listapi: ${this.dataProfile.data.binance_key}`);
          this.name.nativeElement.value = this.dataProfile.user.name;
          this.email.nativeElement.value = this.dataProfile.user.email;
          this.phone.nativeElement.value = this.dataProfile.user.phone_number;
          this.no_identity.nativeElement.value = this.dataProfile.user.no_identity;
          this.address.nativeElement.value = this.dataProfile.user.address;
        } else {
          this.name.nativeElement.value = '';
          this.email.nativeElement.value = '';
          this.phone.nativeElement.value = '';
          this.no_identity.nativeElement.value = '';
          this.address.nativeElement.value = '';
        }
    }, error => {
      console.log(error); 
    });
  }

  updateProfile(): void {
    const token = this.authService.getToken()
    const headers = { 'Authorization': 'Bearer ' + token };

    const email: string = this.email?.nativeElement.value;
    const name: string = this.name?.nativeElement.value;
    const phone: string = this.phone?.nativeElement.value;
    const address: string = this.address?.nativeElement.value;
    const no_identity: string = this.no_identity?.nativeElement.value;

    this.http.post(environment.apiUrl +'profile', {email, name, phone, address, no_identity}, { headers }).subscribe(
      () => {
        this.toastr.success('Success, Update profile success')
        this.getDataProfile();
        location.reload()
        // StatmentPageComponent.getDataHistory()
    },
    (error) => {
      console.log('Connecting failed:', error.error);
      this.toastr.error('Failed, Please check again');
    });
  }

  showPageSetting() {

  }
  
  showPageAccountVerified() {

  }

  showPageDocumentVerificationActive() {

  }

}
