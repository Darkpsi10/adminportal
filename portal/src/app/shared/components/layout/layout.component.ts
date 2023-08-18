import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../../../core/auth/service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LayoutService } from '../../../core/layout/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  currentUser: any = {};

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public auth: AuthService,
    public jwthelper: JwtHelperService,
    public layout: LayoutService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    let id = this.jwthelper.decodeToken(
      localStorage.getItem('access_token')!
    ).id;
    this.auth.get(`user/${id}`).subscribe((res: any) => {
      this.currentUser = res.data;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  selectComponent(component: string): void {
    this.layout.selectedComponent = component;
  }

  checkComponent(component: string) {
    if (this.layout.selectedComponent === component) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.auth.logout();
  }
}
