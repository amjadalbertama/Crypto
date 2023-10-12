import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StatmentPageComponent } from '../../pages/statment-page/statment-page.component';

declare var $: any;

@Component({
  selector: 'app-connect-api',
  templateUrl: './connect-api.component.html',
  styleUrls: ['./connect-api.component.scss']
})
export class ConnectApiComponent implements OnInit{
  @ViewChild('connectAPI') myModal!: ElementRef;
  @ViewChild('api_key') api_key!: ElementRef;
  @ViewChild('secret_key') secret_key!: ElementRef;

  isLoggedIn: boolean;

  dataListApi: any;

  constructor(
    private http: HttpClient, private router: Router, 
    private authService: AuthService, 
    private toastr: ToastrService, 
    // private historyService: StatmentPageComponent
    ) {
    this.isLoggedIn = authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.getDataConnectApi()
    // this.connecting()
    
  }

  getDataConnectApi(): void {
    const token = this.authService.getToken()
    const headers = { 'Authorization': 'Bearer ' + token };
    this.http.get(environment.apiUrl +'binance/account',{ headers },)
      .subscribe(response => {
        this.dataListApi = response;
        console.log(this.dataListApi)
        if (this.dataListApi && this.dataListApi.data[0]) {
          console.log(`listapi: ${this.dataListApi.data[0].binance_key}`);
          this.api_key.nativeElement.value = this.dataListApi.data[0].binance_key;
          this.secret_key.nativeElement.value = this.dataListApi.data[0].binance_secret;
        } else {
          this.api_key.nativeElement.value = '';
          this.secret_key.nativeElement.value = '';
        }
    }, error => {
      console.log(error); 
    });
  }

  connecting(): void {
    const token = this.authService.getToken()
    const headers = { 'Authorization': 'Bearer ' + token };

    const binance_key: string = this.api_key?.nativeElement.value;
    const binance_secret: string = this.secret_key?.nativeElement.value;
    console.log("tes key ini:", binance_key);

    this.http.post(environment.apiUrl +'binance/account', {binance_key, binance_secret}, { headers }).subscribe(
      () => {
        this.toastr.success('Connected')
        this.getDataConnectApi();
        location.reload()
        // StatmentPageComponent.getDataHistory()
    },
    (error) => {
      console.log('Connecting failed:', error.error);
      this.toastr.error('Failed, Connecting failed. Please check your API Key and Secret Key and try again.');
    });
  }

  openModal() {
    $(this.myModal.nativeElement).modal('show');
  }
  
  closeModal() {
    $(this.myModal.nativeElement).modal('hide');
  }
}
