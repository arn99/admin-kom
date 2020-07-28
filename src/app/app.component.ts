import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    public router: Router,
    private swUpdate: SwUpdate, @Inject(PLATFORM_ID) private platformId: any) {
    AppComponent.isBrowser.next(isPlatformBrowser(platformId));
  }
  static isBrowser = new BehaviorSubject<boolean>(null);
  title = 'admin-kom';
  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

          if (confirm('New version available. Load New Version?')) {

              window.location.reload();
              this.router.navigate(['/']);
          }
      });
  }

  }
}
