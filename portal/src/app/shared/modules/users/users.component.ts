import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../core/auth/service/auth.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LayoutService } from '../../../core/layout/layout.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns = [
    'id',
    'username',
    'password',
    'email',
    'image_name',
    'image_path',
    'update',
    'delete',
  ];
  dataSource = new MatTableDataSource<any>();
  pageEvent!: PageEvent;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 50];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('userSort') userSort = new MatSort();

  ngOnInit(): void {
    this.getData();
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<User>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.userSort;
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    public jwtHelper: JwtHelperService,
    private layout: LayoutService
  ) {}

  getData() {
    this.auth.getAll('allUsers').subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    const check = this.jwtHelper.decodeToken(
      localStorage.getItem('access_token')!
    );
    if (id === check.id) {
      window.alert(`Login from another account to delete this user`);
    } else {
      this.auth.delete(`delete/${id}`).subscribe((data: any) => {
        this.getData();
      });
      window.alert(`User with ID ${id} successfully deleted`);
    }
  }

  update(id: number) {
    this.layout.id = id;
    this.layout.selectedComponent = 'update';
  }

  addUser() {
    this.router.navigate(['register']);
  }
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  image_name: string;
  image_path: string;
}
