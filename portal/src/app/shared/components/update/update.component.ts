import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../../../core/auth/service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LayoutService } from '../../../core/layout/layout.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit, DoCheck {
  currentUser: any = {};
  updateForm!: FormGroup;
  hide: boolean = true;
  data: Array<any> = [];
  objUrl: string = '';
  isEmpty: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private layout: LayoutService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getData();
  }

  ngDoCheck(): void {
    if (Object.keys(this.currentUser).length === 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
  }

  buildForm() {
    this.updateForm = this.formBuilder.group({
      image: [''],
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
          ),
          Validators.required,
        ],
      ],
    });
  }

  // address: [''],
  // DOB: [''],
  // phone: ['', Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)],
  // status: ['Yes'],

  getData() {
    let id = this.layout.id;
    this.auth.get(`user/${id}`).subscribe((res: any) => {
      this.currentUser = res.data;
      this.setForm();
    });
  }

  setForm() {
    this.updateForm.controls['email'].setValue(this.currentUser.email);
    this.updateForm.controls['username'].setValue(this.currentUser.username);
    this.updateForm.controls['password'].setValue(this.currentUser.password);
  }

  clearForm() {
    this.updateForm.reset();
    const imageElement = document.getElementById('myImg') as HTMLImageElement;
    imageElement.src = '';
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.updateForm.patchValue({
        image: file,
      });
      const imageElement = document.getElementById('myImg') as HTMLImageElement;
      this.objUrl = window.URL.createObjectURL(file);
      imageElement.src = this.objUrl;
    }
  }

  goBack() {
    this.layout.selectedComponent = 'users';
  }

  update(): void {
    if (this.updateForm.valid) {
      this.updateUser();
      window.alert(`User details successfully updated`);
      this.layout.selectedComponent = 'users';
    }
  }

  updateUser() {
    if (this.objUrl) {
      const formData = new FormData();
      formData.append('username', this.updateForm.value.username);
      formData.append('password', this.updateForm.value.password);
      formData.append('email', this.updateForm.value.email);
      formData.append('image', this.updateForm.value.image);
      let id = this.layout.id;
      this.auth.put(`update/${id}`, formData).subscribe((data: any) => {
        this.layout.selectedComponent = 'users';
      });
    } else {
      let id = this.layout.id;
      this.auth
        .put(`update/${id}`, this.updateForm.value)
        .subscribe((data: any) => {
          this.layout.selectedComponent = 'users';
        });
    }
    URL.revokeObjectURL(this.objUrl);
  }
}
