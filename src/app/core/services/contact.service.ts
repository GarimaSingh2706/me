import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ContactForm } from '../models/portfolio.models';

/**
 * Contact service — structured for future Spring Boot REST API integration.
 *
 * To connect the backend, replace the simulated submit() with an HttpClient call:
 *   POST /api/contact  (body: ContactForm)
 *
 * The interface is intentionally identical to what the future API will expect.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  /**
   * Submits the contact form.
   * Currently simulates a network call. Replace with HttpClient.post when backend is ready.
   */
  submit(form: ContactForm): Observable<{ success: boolean; message: string }> {
    // --- Future implementation ---
    // return this.http.post<{ success: boolean; message: string }>('/api/contact', form);

    // --- Simulated implementation (frontend-only) ---
    if (!form.name || !form.email || !form.message) {
      return throwError(() => new Error('Please fill in all required fields.')).pipe(delay(800));
    }
    return of({ success: true, message: 'Message sent successfully!' }).pipe(delay(1200));
  }
}
