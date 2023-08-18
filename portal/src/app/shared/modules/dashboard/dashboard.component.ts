import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/service/auth.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public chartSalary: any;
  public chartAge: any;
  private Name: Array<String> = [];
  private Salary: Array<Number> = [];
  private Age: Array<Number> = [];

  createSalary() {
    this.chartSalary = new Chart('Salary', {
      type: 'bar',
      data: {
        labels: this.Name,
        datasets: [
          {
            label: 'Salary',
            data: this.Salary, //SALARY
            backgroundColor: 'darkgreen',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  createAge() {
    this.chartAge = new Chart('Age', {
      type: 'line',
      data: {
        labels: this.Name,
        datasets: [
          {
            label: 'Age',
            data: this.Age, //DATE - DOB
            backgroundColor: 'limegreen',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.auth.getAll('allInds').subscribe((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        this.Name.push((res.data[i].firstname += ' ' + res.data[i].lastname));
        this.Salary.push(res.data[i].salary);
        this.Age.push(this.getAge(res.data[i].DOB));
      }
      this.createSalary();
      this.createAge();
    });
  }

  getAge(DOB: Date) {
    return Math.floor((Date.now() - new Date(DOB).getTime()) / 3.15576e10);
  }
}
