import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-statment-page',
  templateUrl: './statment-page.component.html',
  styleUrls: ['./statment-page.component.scss']
})
export class StatmentPageComponent implements OnInit{
  page1: boolean = true;
  page2: boolean = false;
  page3: boolean = false;
  isLoggedIn: boolean;
  isSuccess: boolean | undefined;
  errorMessage: string | undefined;
  //kategory
  isTodayProfitActive = true;
  isTotalProfitActive = false;
  isCoinProfitActive = false;

  //filter
  isTodayFilterActive = true;
  isMonthlyFilterActive = false;
  isTotalFilterActive = false;

  dataProfit: any;
  dataHistory: any;

  timestempstart: number = 0;
  timestempend: number = 0;

  //time total profit

  constructor(private http: HttpClient, private authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.setTimeStamps('today');
    this.getDataProfit();
    this.getDataHistory();
  }

  setTimeStamps(filter: string) {
    const now = new Date();
    now.setSeconds(0, 0); // Atur detik dan milidetik menjadi 0
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // Tanggal 1 bulan ini
  
    if (filter === 'today') {
      this.timestempstart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      this.timestempend = now.getTime();
    } else if (filter === 'monthly') {
      this.timestempstart = startOfMonth.getTime() - 1 * 24 * 60 * 60 * 1000; // Tanggal 1 bulan lalu
      this.timestempend = now.getTime();
    } else if (filter === 'total') {
      const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1); // Tanggal 3 bulan lalu
      this.timestempstart = threeMonthsAgo.getTime();
      this.timestempend = now.getTime();
    }
  }
  
  getDataProfit(): void {
    const token = this.authService.getToken()
    const headers = { 'Authorization': 'Bearer ' + token };
    this.http.post(environment.apiUrl +'binance/income/daily?symbol=all&start_date=' + this.timestempstart + '&end_date=' + this.timestempend,{}, { headers })
      .subscribe(response => {
        this.dataProfit = response;
        console.log(this.dataProfit)
        for (let coin of this.dataProfit.data) {
          // console.log(`Coin: ${coin.key}`);
          for (let value of coin.value) {
            // console.log(`Date: ${value.date}, Profit: ${value.profit}`);
          }
        }
    });
  }
  
  getDataHistory(): void {
    interface ApiResponse {
      success: boolean;
      data: any;
      message: string;
    }
    // console.log(this.timestempstart)
    // console.log(this.timestempend)
    const token = this.authService.getToken()
    const headers = { 'Authorization': 'Bearer ' + token };
    this.http.post<ApiResponse>(environment.apiUrl +'binance/income?start_date=' + this.timestempstart + '&end_date=' + this.timestempend,{}, { headers })
      .subscribe(response => {
        if (response.success) {
          this.isSuccess = true;
          this.dataHistory = response.data;
          console.log(this.dataHistory);
        } else {
          this.isSuccess = false;
          this.errorMessage = response.message;
        }
    });
  }

  showPage1() {
    this.isTodayProfitActive = true;
    this.isTotalProfitActive = false;
    this.isCoinProfitActive = false;
    this.page1 = true;
    this.page2 = false;
    this.page3 = false;
  }

  showPage2() {
    this.isTodayProfitActive = false;
    this.isTotalProfitActive = true;
    this.isCoinProfitActive = false;
    this.page1 = false;
    this.page2 = true;
    this.page3 = false;
  }

  showPage3() {
    this.isTodayProfitActive = false;
    this.isTotalProfitActive = false;
    this.isCoinProfitActive = true;
    this.page1 = false;
    this.page2 = false;
    this.page3 = true;
  }

  showfilter1() {
    this.isTodayFilterActive = true;
    this.isMonthlyFilterActive = false;
    this.isTotalFilterActive = false;
    this.setTimeStamps('today');
    this.getDataHistory();
  }

  showfilter2() {
    this.isTodayFilterActive = false;
    this.isMonthlyFilterActive = true;
    this.isTotalFilterActive = false;
    this.setTimeStamps('monthly');
    this.getDataHistory();
  }

  showfilter3() {
    this.isTodayFilterActive = false;
    this.isMonthlyFilterActive = false;
    this.isTotalFilterActive = true;
    this.setTimeStamps('total');
    this.getDataHistory();
  }

}
