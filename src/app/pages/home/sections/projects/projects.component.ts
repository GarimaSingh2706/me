
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, IconComponent, ScrollRevealDirective],
  template: `
    <section id="projects" class="section projects">
      <div class="container">
        <div class="section-header" appScrollReveal>
          <span class="section-label mono">04. Projects</span>
          <h2 class="section-title">Featured Work</h2>
          <p class="section-subtitle">
            A selection of projects showcasing full-stack and ML expertise
          </p>
        </div>

        <div class="projects__grid">
          <article
            *ngFor="let project of projects; let i = index"
            class="project-card glass-card"
            appScrollReveal
            [revealDelay]="i * 120"
          >
            <!-- Visual placeholder -->
            <div
              class="project-card__visual"
              [class]="'project-card__visual--' + project.image"
            >
              <div class="project-card__visual-grid"></div>
              <div class="project-card__visual-glow"></div>

              <div class="project-card__visual-icon">
                <app-icon [icon]="getProjectIcon(project.slug)" [size]="40" />
              </div>

              <div class="project-card__visual-overlay"></div>
            </div>

            <div class="project-card__body">
              <h3 class="project-card__title">{{ project.title }}</h3>
              <p class="project-card__tagline">{{ project.tagline }}</p>
              <p class="project-card__desc">{{ project.description }}</p>

              <div class="project-card__tech">
                <span class="tech-badge" *ngFor="let tech of project.technologies">
                  {{ tech }}
                </span>
              </div>

              <div class="project-card__actions">
                <button
                  class="btn btn-ghost"
                  (click)="viewDetails(project.slug)"
                >
                  <span>View Details</span>
                  <app-icon icon="arrow_right" [size]="16" />
                </button>

                <a
                  class="project-card__icon-btn"
                  [href]="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub repository"
                >
                  <app-icon icon="github" [size]="18" />
                </a>
              </div>
            </div>

            <div class="project-card__border-glow"></div>
          </article>
        </div>
      </div>
    </section>
  `,
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private dataService = inject(PortfolioDataService);
  private router = inject(Router);

  projects = this.dataService.projects;

  viewDetails(slug: string): void {
    this.router.navigate(['/projects', slug]);
  }

  getProjectIcon(slug: string): string {
    const icons: Record<string, string> = {
      farmaid: 'layout',
      meditrust: 'server',
      'dental-cavity-detection': 'eye',
    };

    return icons[slug] || 'folder';
  }
}
