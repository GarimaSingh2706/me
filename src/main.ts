import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { App } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),
  ],
}).catch((err) => console.error(err));
