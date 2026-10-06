import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, IconComponent, ScrollRevealDirective],
  template: `
    <section id="certifications" class="section certifications">
      <div class="container">
        <div class="section-header" appScrollReveal>
          <span class="section-label mono">05. Certifications</span>
          <h2 class="section-title">Credentials &amp; Achievements</h2>
          <p class="section-subtitle">Continuous learning and professional development</p>
        </div>

        <div class="cert__grid">
          <a
            *ngFor="let cert of certifications; let i = index"
            class="cert-card glass-card"
            [href]="cert.credentialUrl"
            target="_blank"
            rel="noopener noreferrer"
            appScrollReveal
            [revealDelay]="i * 80"
          >
            <div class="cert-card__icon">
              <app-icon [icon]="cert.icon" [size]="24" />
              <div class="cert-card__icon-bg"></div>
            </div>
            <div class="cert-card__content">
              <h3 class="cert-card__title">{{ cert.title }}</h3>
              <p class="cert-card__issuer">{{ cert.issuer }}</p>
            </div>
            <div class="cert-card__year">
              <span class="mono">{{ cert.year }}</span>
            </div>
            <div class="cert-card__hover-line"></div>
          </a>
        </div>
      </div>
    </section>
  `,
  styleUrl: './certifications.component.scss',
})
export class CertificationsComponent {
  private dataService = inject(PortfolioDataService);
  certifications = this.dataService.certifications;
}
