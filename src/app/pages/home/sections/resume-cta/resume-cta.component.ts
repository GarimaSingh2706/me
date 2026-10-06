import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-resume-cta',
  standalone: true,
  imports: [CommonModule, IconComponent, ScrollRevealDirective],
  template: `
    <section class="section resume-cta">
      <div class="container">
        <div class="resume-cta__card glass-card" appScrollReveal>
          <div class="resume-cta__bg-pattern" aria-hidden="true"></div>
          <div class="resume-cta__content">
            <div class="resume-cta__icon">
              <app-icon icon="download" [size]="32" />
            </div>
            <h2 class="resume-cta__title">Want to know more about my experience?</h2>
            <p class="resume-cta__text">
              Download my resume for a complete overview of my skills, projects, and professional background.
            </p>
            <a class="btn btn-primary resume-cta__btn" [href]="resumeUrl" download>
              <app-icon icon="download" [size]="18" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './resume-cta.component.scss',
})
export class ResumeCtaComponent {
  private dataService = inject(PortfolioDataService);
  resumeUrl = this.dataService.resumeUrl;
}
