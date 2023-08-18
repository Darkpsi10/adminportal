import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { IndustriesComponent } from './shared/modules/industries/industries.component';
import { DashboardComponent } from './shared/modules/dashboard/dashboard.component';
import { IndustryComponent } from './shared/modules/industry/industry.component';
import { UpdateComponent } from './shared/components/update/update.component';
import { AppRoutingModule } from './app-routing.module';
import { AddressComponent } from './shared/modules/address/address.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './shared/modules/auth/signup/signup.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { UsersComponent } from './shared/modules/users/users.component';
import { LoginComponent } from './shared/modules/auth/login/login.component';
import { UpindComponent } from './shared/components/upind/upind.component';
import { TasksComponent } from './shared/modules/tasks/tasks.component';
import { TreeComponent } from './shared/modules/tree/tree.component';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './core/auth/service/auth.service';
import { AuthInterceptor } from './core/http/http.service';
import { MaterialModule } from './shared/material.module';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    IndustriesComponent,
    DashboardComponent,
    AddressComponent,
    IndustryComponent,
    UpdateComponent,
    SignupComponent,
    LayoutComponent,
    UsersComponent,
    LoginComponent,
    TasksComponent,
    TreeComponent,
    AppComponent,
    UpindComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMomentDateModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['localhost3000/api/auth'],
      },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { strict: true } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
