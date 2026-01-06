import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';


// Add:

// Menu
import { MatMenuModule } from '@angular/material/menu';         //  <mat-menu>
import { MatToolbarModule } from '@angular/material/toolbar';   //  <mat-toolbar>
import { CommonModule } from "@angular/common";                 //  *ngFor
import { Router } from '@angular/router';                       // constructor(private router: Router) {}

// Sidebar
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


// Menu down section
import { MatExpansionModule } from '@angular/material/expansion';

// Popup
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { OnInit } from '@angular/core';
import { Inject, PLATFORM_ID, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';


// Browser Title
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet

    // Add:

    // Nested Menu
    ,MatMenuModule,       //  <mat-menu>
    MatToolbarModule,     //  <mat-toolbar>
    CommonModule,         //  *ngFor


    // Sidebar
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,

    RouterLink,

    // Sidebar Menu down section
    MatExpansionModule

  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App implements OnInit {
  protected readonly title = signal('06portfolioapp');

  // Sidebar responsive
  isSmallScreen = false;

   isPopup = false;
  // isPopup = !!window.opener;

  constructor(
      private router: Router,         // Nested Menu
      private breakpointObserver: BreakpointObserver,

      private titleService: Title     // Browser Title
      
  ) {

    // Popup
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.isPopup = this.router.url.includes('popup=1');
      });


  }

  // popup
  ngOnInit(): void {
     // this.isPopup = !!window.opener;

    // if (isPlatformBrowser(this.platformId)) {
    //   this.isPopup = !!window.opener;
    // }

    this.titleService.setTitle('REBANAWA10 - Angular Portfolio');

    if (typeof window !== 'undefined') {
      this.isPopup = !!window.opener;
    }

  }

  navigateTo(routeUrl: string): void {
      this.router.navigate([routeUrl]);
  }
}
