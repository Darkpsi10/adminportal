import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hide: boolean = true;
  chide: boolean = true;
  imgerr: boolean = false;
  objUrl: string = '';
  showImg: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      image: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: [
        '',
        [
          Validators.pattern(
            /(^.*(?=.{5,15})(?=.*[a-zA-Z])(?=.*[a-zA-Z0-9]).*$)/
          ),
          Validators.max(15),
          Validators.required,
        ],
      ],
      password: [
        '',
        [
          Validators.pattern(
            /(^.*(?=.{8,20})(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*_]).*$)/
          ), //
          Validators.required,
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.pattern(
            /(^.*(?=.{8,20})(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*_]).*$)/
          ),
          Validators.required,
        ],
      ],
    });
  }

  signup(): void {
    if (this.signupForm.valid) {
      const password = this.signupForm.value.password;
      const confirmPassword = this.signupForm.value.confirmPassword;
      if (password === confirmPassword) {
        this.registerUser();
        this.signupForm.reset();
        this.router.navigate(['/login']);
      } else {
        // show error for no match
      }
    } else {
      this.imgerr = true;
    }
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (!file.type.endsWith('.jpg,.jpeg,.png')) {
        this.signupForm.patchValue({
          image: file,
        });
        const imageElement = document.getElementById(
          'myImg'
        ) as HTMLImageElement;
        this.objUrl = window.URL.createObjectURL(file);
        imageElement.src = this.objUrl;
        this.showImg = true;
      }
    }
  }
  registerUser() {
    const formData = new FormData();
    formData.append('username', this.signupForm.value.username);
    formData.append('password', this.signupForm.value.password);
    formData.append('email', this.signupForm.value.email);
    formData.append('image', this.signupForm.value.image);
    this.auth.post('register', formData).subscribe((data: any) => {
      localStorage.setItem('access_token', data.token);
      this.router.navigate(['login']);
    });
  }
}
