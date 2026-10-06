import { Component } from '@angular/core';
import { ProjectsComponent } from '../home/sections/projects/projects.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [ProjectsComponent, ScrollRevealDirective],
  template: `
    <div class="projects-page">
      <div class="projects-page__header" appScrollReveal>
        <div class="container">
          <span class="section-label mono">Projects</span>
          <h1 class="section-title">All Projects</h1>
          <p class="section-subtitle">A collection of my work across full-stack development and machine learning</p>
        </div>
      </div>
      <app-projects />
    </div>
  `,
  styleUrl: './projects-page.component.scss',
})
export class ProjectsPageComponent {}
