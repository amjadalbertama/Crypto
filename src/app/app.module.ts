import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './modal/login/login.component';
import { RegisterComponent } from './modal/register/register.component';
import { ValidationAccountComponent } from './modal/validation-account/validation-account.component';
import { ConnectApiComponent } from './modal/connect-api/connect-api.component';
import { ProfileComponent } from './setting/profile/profile.component';
// import { AppModalComponent } from '../app-modal/app-modal.component'; 
// import { StoreModule } from '@ngrx/store';
// import { reducers } from './store';
import { HttpClientModule } from '@angular/common/http'; 
import { ToastrModule } from 'ngx-toastr';

import { AuthService } from './service/auth-service';
import { AuthGuard } from './service/auth-guard';
import { StatmentPageComponent } from './pages/statment-page/statment-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ValidationAccountComponent,
    ConnectApiComponent,
    ProfileComponent,
    StatmentPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }), 
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
