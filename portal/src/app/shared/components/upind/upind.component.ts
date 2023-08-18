import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/service/auth.service';
import { LayoutService } from '../../../core/layout/layout.service';

@Component({
  selector: 'app-upind',
  templateUrl: './upind.component.html',
  styleUrls: ['./upind.component.scss'],
})
export class UpindComponent implements OnInit, DoCheck {
  currentUser: any = {};
  updateForm!: FormGroup;
  types: Array<any> = [];
  isEmpty: Boolean = false;
  radioV!: number;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private layout: LayoutService
  ) {}

  ngOnInit(): void {
    this.buildform();
    this.getTypes();
    this.getData();
  }

  ngDoCheck(): void {
    if (Object.keys(this.currentUser).length === 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
  }

  buildform() {
    this.updateForm = this.formBuilder.group({
      firstname: [
        '',
        [
          Validators.pattern(/(^.*(?=.*[a-zA-Z]).*$)/),
          Validators.max(30),
          Validators.required,
        ],
      ],
      lastname: [
        '',
        [Validators.pattern(/(^.*(?=.*[a-zA-Z]).*$)/), Validators.max(30)],
      ],
      ind_name: [
        '',
        [
          Validators.pattern(/(^.*(?=.*[a-zA-Z]).*$)/),
          Validators.max(50),
          Validators.required,
        ],
      ],
      ind_type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      email2: ['', Validators.email],
      phone: [
        '',
        [Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/), Validators.required],
      ],
      phone2: ['', [Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)]],
      address: ['', Validators.required],
      address2: [''],
      DOB: ['', Validators.required],
      status: ['', Validators.required],
      salary: [
        '',
        [Validators.pattern(/^(?!0+(?:\.0+)?$)[0-9]+(?:\.[0-9]{1,3})?$/)],
      ],
    });
  }

  getData() {
    let id = this.layout.id;
    this.auth.get(`ind/${id}`).subscribe((res: any) => {
      this.currentUser = res.data;
      this.setForm();
    });
  }

  setForm() {
    this.updateForm.controls['firstname'].setValue(this.currentUser.firstname);
    this.updateForm.controls['lastname'].setValue(this.currentUser.lastname);
    this.updateForm.controls['ind_type'].setValue(this.currentUser.ind_type);
    this.updateForm.controls['ind_name'].setValue(this.currentUser.ind_name);
    this.updateForm.controls['address'].setValue(this.currentUser.address);
    this.updateForm.controls['address2'].setValue(this.currentUser.address2);
    this.updateForm.controls['email'].setValue(this.currentUser.email);
    this.updateForm.controls['email2'].setValue(this.currentUser.email2);
    this.updateForm.controls['phone'].setValue(this.currentUser.phone);
    this.updateForm.controls['phone2'].setValue(this.currentUser.phone2);
    this.updateForm.controls['DOB'].setValue(this.currentUser.DOB);
    this.updateForm.controls['status'].setValue(this.currentUser.status);
    this.updateForm.controls['salary'].setValue(this.currentUser.salary);
  }

  goBack() {
    this.layout.selectedComponent = 'industries';
  }

  clearForm() {
    this.updateForm.reset();
  }

  getTypes() {
    this.auth.getAll('allTypes').subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.types.push(data[i]);
      }
    });
  }

  update(): void {
    if (this.updateForm.valid) {
      let id = this.layout.id;
      this.auth
        .put(`updind/${id}`, this.updateForm.value)
        .subscribe((data: any) => {
          window.alert(`User details successfully updated`);
          this.layout.selectedComponent = 'industries';
        });
    }
  }
}
