import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaxReform, TaxReformData, TaxRoleDetails } from './models/tax-reform.model';
import { Role } from './tax.model';
import { environment } from 'src/environments/environment';
import { BaseHttpService } from 'src/Utils/BaseHttp/base-http.service';
import { ApiResponse } from 'src/Utils/interfaces/apiResponse';
import { RoleTax } from './models/role-tax.model';
import { SubCategoryData } from './models/tax-category-model';

@Injectable({
  providedIn: 'root',
})
export class TaxReformService extends BaseHttpService {

    constructor(public override httpClient?: HttpClient) {
        super()
    }
 

  /**
   * Insert tax reform data (used in admin panel or seed action)
   * @param payload any
   */
  insertTaxData(payload: any): Observable<any> {
    let con = environment.BaseUrl + environment.getTaxByCategory;
    return this.post<any>(con, payload);
  }

  ///////////////////
    getAll(): Observable<TaxReformData[]> {
    let con = environment.BaseUrl + environment.getTaxByCategory;

    return this.get<TaxReformData[]>(con);
  }

  // getByCategory(category: string): Observable<TaxReformData> {
  //   let con = environment.BaseUrl + environment.getTaxByCategory+ category;

  //   return this.get<TaxReformData>(con);
  // }

  getByRole(role: string): Observable<TaxRoleDetails> {
    let con = environment.BaseUrl + environment.getTaxByCategory+ role;

    return this.get<TaxRoleDetails>(con);
  }

  getByTaxCategory(taxCategory: string): Observable<TaxReformData[]> {
    let con = environment.BaseUrl + environment.getTaxByCategory+ taxCategory;

    return this.get<TaxReformData[]>(con);
  }

  // get roles 

  getRoles(): Observable< ApiResponse<Role[]> > {
    let con = environment.BaseUrl + environment.getRoles;
            return this.get<ApiResponse<Role[]>>(con, );
  }

  //Role tax
  getTaxByRoleAndIncome(role: string, income: number): Observable<ApiResponse<RoleTax>> {
    const params = new URLSearchParams({
      role,
      income: income.toString()
    });
    let con = environment.BaseUrl + environment.getTaxByRoleAndIncome+`?${params.toString()}`;

    return this.get<ApiResponse<RoleTax>>(con);
  }

  //#region tax category
  
 getTaxCategories(): Observable<SubCategoryData[]> {
    let con = environment.BaseUrl + environment.getAllTaxcategories;
    debugger
    return this.get<SubCategoryData[]>(con);
  }

  getByCategory(categoryType: 'Individuals' | 'Businesses'): Observable<SubCategoryData[]> {
    let con = environment.BaseUrl + environment.getByCategoryType +  categoryType;

    return this.get<SubCategoryData[]>(con);
  }

  //
}
