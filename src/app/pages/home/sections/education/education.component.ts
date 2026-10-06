import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, IconComponent, ScrollRevealDirective],
  template: `
    <section id="education" class="section education">
      <div class="container">
        <div class="section-header" appScrollReveal>
          <span class="section-label mono">06. Education</span>
          <h2 class="section-title">Academic Background</h2>
        </div>

        <div class="edu-timeline">
          <div class="edu-timeline__line" appScrollReveal></div>

          <div
            *ngFor="let item of education; let i = index"
            class="edu-timeline__item"
            appScrollReveal
            [revealDelay]="200"
          >
            <div class="edu-timeline__marker">
              <app-icon icon="graduation" [size]="20" />
            </div>

            <div class="edu-card glass-card">
              <div class="edu-card__header">
                <h3 class="edu-card__institution">{{ item.institution }}</h3>
                <span class="edu-card__period mono">{{ item.period }}</span>
              </div>
              <p class="edu-card__degree">{{ item.degree }}</p>
              <p class="edu-card__desc">{{ item.description }}</p>
              <div class="edu-card__score">
                <span class="edu-card__score-label">{{ item.scoreLabel }}</span>
                <span class="edu-card__score-value">{{ item.score }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  private dataService = inject(PortfolioDataService);
  education = this.dataService.education;
}
