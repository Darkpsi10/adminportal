import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  loginerr = false;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      check: true,
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  checkCredentials() {
    if (this.loginForm.valid) {
      this.auth.post('login', this.loginForm.value).subscribe((data: any) => {
        if (data) {
          localStorage.setItem('access_token', data.token);
          this.router.navigate(['/home']);
        } else {
          this.loginerr = true;
        }
      });
    }
  }
}
