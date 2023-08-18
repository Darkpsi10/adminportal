import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../core/auth/service/auth.service';
import { MatSort } from '@angular/material/sort';
import { LayoutService } from '../../../core/layout/layout.service';

@Component({
  selector: 'app-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss'],
})
export class IndustriesComponent implements OnInit {
  displayedColumns = [
    'id',
    'firstname',
    'lastname',
    'ind_name',
    'ind_type',
    'address',
    'address2',
    'phone',
    'phone2',
    'email',
    'email2',
    'DOB',
    'status',
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
  @ViewChild('userSort') indSort = new MatSort();

  ngOnInit(): void {
    this.getData();
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Industry>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.indSort;
  }

  constructor(private auth: AuthService, private layout: LayoutService) {}

  getData() {
    this.auth.getAll('allInds').subscribe((data: any) => {
      this.dataSource.data = data.data;
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
    this.auth.delete(`delind/${id}`).subscribe((data: any) => {
      this.getData();
    });
    window.alert(`User with ID ${id} successfully deleted`);
  }

  update(id: number) {
    this.layout.id = id;
    this.layout.selectedComponent = 'upind';
  }
}

export interface Industry {
  id: number;
  firstname: string;
  lastname: string;
  ind_name: string;
  ind_type: string;
  address: string;
  address2: string;
  phone: number;
  phone2: number;
  email: string;
  email2: string;
  DOB: string;
  status: string;
  name: string;
  formatted_date: string;
}
