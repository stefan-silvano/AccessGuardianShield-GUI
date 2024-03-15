import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.autoLogin().subscribe(() => {
      if (this.router.url === '/auth') this.router.navigate(['/dashboard']);
    });
    this.authService.autoLogout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
