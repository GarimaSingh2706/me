import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <footer class="footer">
      <div class="footer__inner container">
        <div class="footer__brand">
          <div class="footer__logo">
            <span class="footer__logo-bracket">&lt;</span>
            <span>GS</span>
            <span class="footer__logo-bracket">/&gt;</span>
          </div>
          <p class="footer__name">Garima Singh</p>
          <p class="footer__role">Full Stack Developer</p>
        </div>

        <div class="footer__social">
          <a
            *ngFor="let social of socialLinks"
            class="footer__social-link"
            [href]="social.url"
            target="_blank"
            rel="noopener noreferrer"
            [attr.aria-label]="social.label"
          >
            <app-icon [icon]="social.icon" [size]="20" />
          </a>
        </div>

        <div class="footer__nav">
          <a *ngFor="let link of navLinks" (click)="scrollTo(link.fragment)">{{ link.label }}</a>
        </div>

        <div class="footer__bottom">
          <p>&copy; {{ year }} Garima Singh.</p>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private dataService = inject(PortfolioDataService);

  socialLinks = this.dataService.socialLinks;
  navLinks = this.dataService.navLinks;
  year = new Date().getFullYear();

  scrollTo(fragment: string): void {
    const el = document.getElementById(fragment);
    if (el) {
      const top = el.offsetTop - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
