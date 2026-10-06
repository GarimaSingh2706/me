import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ProjectDetail } from '../../core/models/portfolio.models';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent, ScrollRevealDirective],
  template: `
    <section class="project-detail" *ngIf="project() as p">
      <!-- Hero -->
      <div class="project-detail__hero" [class]="'project-detail__hero--' + p.heroImage">
        <div class="project-detail__hero-overlay"></div>
        <div class="container project-detail__hero-content">
          <a class="project-detail__back" routerLink="/projects">
            <app-icon icon="arrow_left" [size]="18" />
            <span>Back to Projects</span>
          </a>
          <p class="project-detail__hero-label mono" appScrollReveal>Case Study</p>
          <h1 class="project-detail__hero-title" appScrollReveal [revealDelay]="100">{{ p.title }}</h1>
          <p class="project-detail__hero-tagline" appScrollReveal [revealDelay]="200">{{ p.tagline }}</p>
          <div class="project-detail__hero-actions" appScrollReveal [revealDelay]="300">
            <a class="btn btn-primary" [href]="p.githubUrl" target="_blank" rel="noopener noreferrer">
              <app-icon icon="github" [size]="18" />
              <span>GitHub</span>
            </a>
            <a class="btn btn-secondary" [href]="p.liveUrl" target="_blank" rel="noopener noreferrer">
              <app-icon icon="external" [size]="18" />
              <span>Live Demo</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="container project-detail__body">
        <!-- Overview -->
        <div class="project-detail__section glass-card" appScrollReveal>
          <h2 class="project-detail__heading">Overview</h2>
          <p class="project-detail__text">{{ p.overview }}</p>
        </div>

        <div class="project-detail__two-col">
          <!-- Problem -->
          <div class="project-detail__section glass-card" appScrollReveal [revealDelay]="100">
            <h3 class="project-detail__subheading">
              <app-icon icon="zap" [size]="20" />
              The Problem
            </h3>
            <p class="project-detail__text">{{ p.problem }}</p>
          </div>

          <!-- Solution -->
          <div class="project-detail__section glass-card" appScrollReveal [revealDelay]="200">
            <h3 class="project-detail__subheading">
              <app-icon icon="check_circle" [size]="20" />
              The Solution
            </h3>
            <p class="project-detail__text">{{ p.solution }}</p>
          </div>
        </div>

        <!-- Features -->
        <div class="project-detail__section glass-card" appScrollReveal>
          <h2 class="project-detail__heading">Key Features</h2>
          <div class="project-detail__features">
            <div class="project-detail__feature" *ngFor="let feature of p.features; let i = index">
              <span class="project-detail__feature-num mono">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="project-detail__feature-text">{{ feature }}</span>
            </div>
          </div>
        </div>

        <!-- Tech Stack -->
        <div class="project-detail__section glass-card" appScrollReveal>
          <h2 class="project-detail__heading">Tech Stack</h2>
          <div class="project-detail__stack">
            <div class="project-detail__stack-category" *ngFor="let stack of p.techStack">
              <h4 class="project-detail__stack-title mono">{{ stack.category }}</h4>
              <div class="project-detail__stack-items">
                <span class="tech-badge" *ngFor="let item of stack.items">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Architecture -->
        <div class="project-detail__section glass-card" appScrollReveal>
          <h2 class="project-detail__heading">Architecture</h2>
          <p class="project-detail__text">{{ p.architecture }}</p>
        </div>

        <div class="project-detail__two-col">
          <!-- Challenges -->
          <div class="project-detail__section glass-card" appScrollReveal [revealDelay]="100">
            <h3 class="project-detail__subheading">
              <app-icon icon="cpu" [size]="20" />
              Challenges
            </h3>
            <p class="project-detail__text">{{ p.challenges }}</p>
          </div>

          <!-- Learnings -->
          <div class="project-detail__section glass-card" appScrollReveal [revealDelay]="200">
            <h3 class="project-detail__subheading">
              <app-icon icon="sparkles" [size]="20" />
              Learnings
            </h3>
            <p class="project-detail__text">{{ p.learnings }}</p>
          </div>
        </div>

        <!-- CTA -->
        <div class="project-detail__cta" appScrollReveal>
          <a class="btn btn-primary" [href]="p.githubUrl" target="_blank" rel="noopener noreferrer">
            <app-icon icon="github" [size]="18" />
            <span>View on GitHub</span>
          </a>
          <a class="btn btn-secondary" routerLink="/projects">
            <span>Explore Other Projects</span>
            <app-icon icon="arrow_right" [size]="18" />
          </a>
        </div>
      </div>
    </section>

    <!-- Not found -->
    <div class="container project-detail__not-found" *ngIf="!project()">
      <h2>Project not found</h2>
      <a class="btn btn-primary" routerLink="/projects">Back to Projects</a>
    </div>
  `,
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(PortfolioDataService);

  project = signal<ProjectDetail | undefined>(this.dataService.getProjectBySlug(''));

  readonly String = String;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug') || '';
      this.project.set(this.dataService.getProjectBySlug(slug));
      window.scrollTo({ top: 0 });
    });
  }
}
