
import {
  Component,
  inject,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section id="about" class="section about">
      <div class="container">
        <div class="section-header" appScrollReveal>
          <span class="section-label mono">01. About Me</span>
          <h2 class="section-title">Who I Am</h2>
        </div>

        <div class="about__grid">
          <div
            class="about__text glass-card"
            appScrollReveal
            [revealDelay]="100"
          >
            <p>{{ aboutInfo.text }}</p>

            <div class="about__highlights">
              <div
                class="about__highlight"
                *ngFor="let h of aboutInfo.highlights"
              >
                <span class="about__highlight-label mono">
                  {{ h.label }}
                </span>
                <span class="about__highlight-value">
                  {{ h.value }}
                </span>
              </div>
            </div>
          </div>

          <div
            class="about__stats"
            appScrollReveal
            [revealDelay]="200"
          >
            <div
              class="about__stat-card glass-card"
              *ngFor="let stat of aboutInfo.stats"
            >
              <div class="about__stat-value">
                <span
                  class="about__stat-number"
                  [attr.data-value]="stat.value"
                >0</span>
                <span class="about__stat-suffix">
                  {{ stat.suffix }}
                </span>
              </div>

              <div class="about__stat-label">
                {{ stat.label }}
              </div>

              <div class="about__stat-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private dataService = inject(PortfolioDataService);

  aboutInfo = this.dataService.aboutInfo;

  private intervalIds: number[] = [];
  private destroyed = false;

  ngAfterViewInit(): void {
    // Start after Angular has rendered the view.
    requestAnimationFrame(() => {
      if (this.destroyed) {
        return;
      }

      const counters = document.querySelectorAll<HTMLElement>(
        '#about .about__stat-number'
      );

      counters.forEach((counter) => {
        this.animateCounter(counter);
      });
    });
  }

  private animateCounter(el: HTMLElement): void {
    const target = Number(el.getAttribute('data-value') ?? 0);

    if (!Number.isFinite(target)) {
      return;
    }

    const duration = 1500;
    const steps = 30;
    const increment = target / steps;
    let currentStep = 0;

    const intervalId = window.setInterval(() => {
      if (this.destroyed) {
        window.clearInterval(intervalId);
        return;
      }

      currentStep++;

      const value =
        currentStep >= steps
          ? target
          : increment * currentStep;

      el.textContent = Number.isInteger(target)
        ? Math.floor(value).toString()
        : value.toFixed(2);

      if (currentStep >= steps) {
        el.textContent = target.toString();
        window.clearInterval(intervalId);
      }
    }, duration / steps);

    this.intervalIds.push(intervalId);
  }

  ngOnDestroy(): void {
    this.destroyed = true;

    this.intervalIds.forEach((id) => {
      window.clearInterval(id);
    });

    this.intervalIds = [];
  }
}
