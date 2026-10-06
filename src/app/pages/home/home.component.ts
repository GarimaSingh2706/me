import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { CertificationsComponent } from './sections/certifications/certifications.component';
import { EducationComponent } from './sections/education/education.component';
import { ResumeCtaComponent } from './sections/resume-cta/resume-cta.component';
import { ContactComponent } from './sections/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    CertificationsComponent,
    EducationComponent,
    ResumeCtaComponent,
    ContactComponent,
  ],
  template: `
    <div class="home-page">
      <app-hero />
      <app-about />
      <app-skills />
      <app-experience />
      <app-projects />
      <app-certifications />
      <app-education />
      <app-resume-cta />
      <app-contact />
    </div>
  `,
})
export class HomeComponent {}
