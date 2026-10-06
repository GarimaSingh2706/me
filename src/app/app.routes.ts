import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Garima Singh — Full Stack Developer',
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects-page.component').then(
        (m) => m.ProjectsPageComponent
      ),
    title: 'Projects — Garima Singh',
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./pages/projects/project-detail.component').then(
        (m) => m.ProjectDetailComponent
      ),
    title: 'Project — Garima Singh',
  },
  { path: '**', redirectTo: '' },
];
