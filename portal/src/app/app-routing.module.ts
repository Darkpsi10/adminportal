import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/modules/auth/login/login.component';
import { SignupComponent } from './shared/modules/auth/signup/signup.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AuthGuard } from './core/auth/guard/auth.guard';
import { NoPageComponent } from './shared/components/no-page/no-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: LayoutComponent, canActivate: [AuthGuard] },
  { path: '**', component: NoPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
