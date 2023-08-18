import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  selectedComponent: string;
  id: number;
  constructor() {
    this.selectedComponent = 'dashboard';
    this.id = 0;
  }
}
