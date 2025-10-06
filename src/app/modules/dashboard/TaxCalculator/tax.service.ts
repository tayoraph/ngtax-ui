import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaxReform } from './models/tax-reform.model';

@Injectable({
  providedIn: 'root',
})
export class TaxReformService {
  private baseUrl = 'http://localhost:3000/tax-reform'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  /**
   * Get all tax reform documents
   */
  getAll(): Observable<TaxReform[]> {
    return this.http.get<TaxReform[]>(`${this.baseUrl}`);
  }

  /**
   * Get tax reform data by role title
   * @param roleTitle string
   */
  getByRole(roleTitle: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/role/${roleTitle}`);
  }

  /**
   * Get tax reform data by category (e.g. WhiteCollar, LargeCompanies)
   * @param category string
   */
  getByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/category/${category}`);
  }

  /**
   * Get tax reform data by tax category (e.g. PIT, CIT)
   * @param taxCategory string
   */
  getByTaxCategory(taxCategory: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tax-category/${taxCategory}`);
  }

  /**
   * Insert tax reform data (used in admin panel or seed action)
   * @param payload any
   */
  insertTaxData(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, payload);
  }
}
