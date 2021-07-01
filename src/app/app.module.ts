import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';

import { AppComponent } from './app.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/http.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'mainpage', component: HomePageComponent, canActivate: [AuthGuardService]}, // only accessible if authorised
      {path: '**', component: LoginComponent}
    ]),
    SocialLoginModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('329603523313-b1q9jch28d6h12v3pf2hp9vk6fac90ik.apps.googleusercontent.com') // your client id
        }
      ]
    }
  }, AuthGuardService,
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
