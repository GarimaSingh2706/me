import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, IconComponent, ScrollRevealDirective],
  template: `
    <section id="experience" class="section experience">
      <div class="container">
        <div class="section-header" appScrollReveal>
          <span class="section-label mono">03. Experience</span>
          <h2 class="section-title">Professional Journey</h2>
        </div>

        <div class="timeline">
          <div class="timeline__line" appScrollReveal></div>

          <div
            *ngFor="let exp of experience; let i = index"
            class="timeline__item"
            appScrollReveal
            [revealDelay]="200"
          >
            <div class="timeline__dot">
              <span class="timeline__dot-inner" [class.pulse]="exp.current"></span>
            </div>

            <div class="timeline__card glass-card">
              <div class="timeline__header">
                <div>
                  <h3 class="timeline__company">{{ exp.company }}</h3>
                  <p class="timeline__role">{{ exp.role }}</p>
                </div>
                <div class="timeline__period">
                  <app-icon icon="calendar" [size]="14" />
                  <span>{{ exp.period }}</span>
                  <span class="timeline__badge" *ngIf="exp.current">Current</span>
                </div>
              </div>

              <p class="timeline__description">{{ exp.description }}</p>

              <ul class="timeline__achievements">
                <li *ngFor="let achievement of exp.achievements">
                  <app-icon icon="check" [size]="14" />
                  <span>{{ achievement }}</span>
                </li>
              </ul>

              <div class="timeline__tech">
                <span class="tech-badge" *ngFor="let tech of exp.technologies">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  private dataService = inject(PortfolioDataService);
  experience = this.dataService.experience;
}
