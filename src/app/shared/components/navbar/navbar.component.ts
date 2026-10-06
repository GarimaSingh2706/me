import { Component, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { ScrollSpyService } from '../../../core/services/scroll-spy.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <nav class="navbar" [class.scrolled]="scrolled" [class.menu-open]="menuOpen">
      <div class="navbar__inner">
        <a class="navbar__logo" (click)="goHome()">
          <span class="navbar__logo-bracket">&lt;</span>
          <span class="navbar__logo-text">GS</span>
          <span class="navbar__logo-bracket">/&gt;</span>
        </a>

        <button
          class="navbar__toggle"
          (click)="toggleMenu()"
          [attr.aria-expanded]="menuOpen"
          aria-label="Toggle navigation menu"
        >
          <app-icon [icon]="menuOpen ? 'x' : 'menu'" [size]="24" />
        </button>

        <ul class="navbar__links" [class.open]="menuOpen">
          <li *ngFor="let link of navLinks; let i = index">
            <a
              class="navbar__link"
              [class.active]="activeSection() === link.fragment"
              (click)="scrollTo(link.fragment)"
              [attr.data-index]="i"
            >
              <span class="navbar__link-text">{{ link.label }}</span>
              <span class="navbar__link-indicator"></span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private dataService = inject(PortfolioDataService);
  private scrollSpy = inject(ScrollSpyService);
  private router = inject(Router);

  navLinks = this.dataService.navLinks;
  activeSection = this.scrollSpy.activeSection;
  scrolled = false;
  menuOpen = false;

  ngOnInit(): void {
    this.scrollSpy.observe(this.navLinks.map((l) => l.fragment));
    this.onScroll();
  }

  ngOnDestroy(): void {
    this.scrollSpy.disconnect();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 50;
  }

  scrollTo(fragment: string): void {
    this.menuOpen = false;
    document.body.classList.remove('no-scroll');

    if (this.router.url !== '/') {
      this.router.navigate(['/'], { fragment }).then(() => {
        setTimeout(() => this.scrollToElement(fragment), 100);
      });
    } else {
      this.scrollToElement(fragment);
    }
  }

  private scrollToElement(fragment: string): void {
    const el = document.getElementById(fragment);
    if (el) {
      const top = el.offsetTop - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  goHome(): void {
    this.menuOpen = false;
    document.body.classList.remove('no-scroll');
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    document.body.classList.toggle('no-scroll', this.menuOpen);
  }
}
