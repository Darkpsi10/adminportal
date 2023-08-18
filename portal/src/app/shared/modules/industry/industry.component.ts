import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/service/auth.service';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.scss'],
})
export class IndustryComponent implements OnInit {
  indForm!: FormGroup;
  hasUnit = false;
  hasBackup = false;
  types: Array<any> = [];

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.buildform();
    this.getTypes();
  }

  buildform() {
    this.indForm = this.formBuilder.group({
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
      status: ['1', Validators.required],
      salary: [
        '',
        [
          Validators.pattern(/^(?!0+(?:\.0+)?$)[0-9]+(?:\.[0-9]{1,3})?$/),
          Validators.required,
        ],
      ],
    });
  }

  clearForm() {
    this.indForm.reset();
  }

  getTypes() {
    this.auth.getAll('allTypes').subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.types.push(data[i]);
      }
    });
  }

  saveInd(): void {
    if (this.indForm.valid) {
      this.auth.post('addind', this.indForm.value).subscribe((data: any) => {
        this.indForm.reset();
      });
    }
  }
}
