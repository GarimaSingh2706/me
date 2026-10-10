import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactForm } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/contact';

  submit(form: ContactForm): Observable<string> {
    return this.http.post(this.apiUrl, form, {
      responseType: 'text'
    });
  }
}