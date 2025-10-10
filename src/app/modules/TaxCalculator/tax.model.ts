export type EntityType = 'Individuals' | 'Businesses';

export interface Role {
  title: string;
  description?: string;
}

export interface IndividualCategory {
  SalaryRange: string;
  TaxCategories: string[];
  Roles: Role[] | string[];
}

export interface BusinessCategory {
  TurnoverRange: string;
  TaxCategories: string[];
  Roles: Role[] | string[];
}

export interface IndividualsData {
  WhiteCollar: IndividualCategory;
  CorporateExecutives: IndividualCategory;
  FreelancersSelfEmployed: IndividualCategory;
  BlueCollar: IndividualCategory;
  DigitalEconomyWorkers: IndividualCategory;
  [key: string]: IndividualCategory; // For any additional categories
}

export interface BusinessesData {
  EntrepreneursSMEs: BusinessCategory;
  LargeCompanies: BusinessCategory;
  [key: string]: BusinessCategory; // For future expansion
}

export interface TaxData {
  Individuals: IndividualsData;
  Businesses: BusinessesData;
}
