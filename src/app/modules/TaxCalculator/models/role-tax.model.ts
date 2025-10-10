// src/app/models/role-tax.model.ts
export interface RoleTaxSuccess {
 categoryType: 'individual' | 'business';
  categoryName: string;
  role: string;
  description: string;
  salaryRange?: string;        // For individuals
  turnoverRange?: string;      // For businesses
  taxCategories: string[];
  exemptedTaxCategories: string[];
  estimatedTax: number;        // Yearly tax
  monthlyTax: number;      
}


export interface TaxErrorResult {
  error: string;
  categoryType: 'individual' | 'business';
  categoryName: string;
  salaryRange?: string;
  turnoverRange?: string;
}

export type RoleTax = RoleTaxSuccess | TaxErrorResult;