import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpindComponent } from './upind.component';

describe('UpindComponent', () => {
  let component: UpindComponent;
  let fixture: ComponentFixture<UpindComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpindComponent]
    });
    fixture = TestBed.createComponent(UpindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
