export interface TaxReform {
  _id: string;
  individuals: Record<string, any>;
  businesses: Record<string, any>;
}


export interface TaxReformData {
  entityType: 'Individuals' | 'Businesses';
  category: string;
  roles?: { title: string; description?: string }[];
  taxCategories?: string[];
  turnoverRange?: string;
  salaryRange?: string;
}

export interface TaxRoleDetails {
  entityType: string;
  category: string;
  title: string;
  description?: string;
  taxCategories?: string[];
  turnoverRange?: string;
  salaryRange?: string;
}

export interface TaxReformState {
  allData: TaxReformData[];
  categoryData: TaxReformData | null;
  roleData: TaxRoleDetails | null;
  taxCategoryData: TaxReformData[];
  loading: boolean;
  error: string | null;
}
