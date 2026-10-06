import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, IconComponent, ScrollRevealDirective],
  template: `
    <section id="skills" class="section skills">
      <div class="container">
        <div class="section-header" appScrollReveal>
          <span class="section-label mono">02. Skills</span>
          <h2 class="section-title">Technical Arsenal</h2>
          <p class="section-subtitle">Technologies and tools I use to build robust, scalable applications</p>
        </div>

        <div class="skills__grid">
          <div
            *ngFor="let category of skills; let i = index"
            class="skill-card glass-card"
            appScrollReveal
            [revealDelay]="i * 100"
            [style.--card-index]="i"
          >
            <div class="skill-card__icon-wrapper">
              <app-icon [icon]="category.icon" [size]="28" />
              <div class="skill-card__icon-glow"></div>
            </div>
            <h3 class="skill-card__title">{{ category.title }}</h3>
            <div class="skill-card__divider"></div>
            <div class="skill-card__chips">
              <span
                *ngFor="let skill of category.skills; let j = index"
                class="skill-chip"
                [style.animation-delay.s]="j * 0.05"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  private dataService = inject(PortfolioDataService);
  skills = this.dataService.skills;
}
