// Represents individual tax exemptions
export interface Exemption {
  type: string;            // e.g., 'incomeBelow', 'goodsServices'
  threshold?: number;      // optional numeric threshold
  exemptItems?: string[];  // optional list of exempt items
  message?: string;        // optional message
}

// Represents tax brackets for progressive taxes
export interface Bracket {
  upTo?: number;           // upper limit of bracket
  above?: number;          // lower limit for top bracket
  ratePercent: number;     // tax rate for this bracket
}

// Represents a single tax item
export interface TaxItem {
  name: string;             // e.g., "Personal Income Tax (PIT)"
  ratePercent: number;
  exemptions?: Exemption[];
  brackets?: Bracket[];
  note?: string;
}

// Represents a subcategory (e.g., WhiteCollar, BlueCollar, SMEs)
export interface SubCategoryData {
  name: string;             // subcategory name like 'WhiteCollar'
  SalaryRange?: string;     // for Individuals
  TurnoverRange?: string;   // for Businesses
  TaxCategories: TaxItem[];
}

export interface  taxCalculationBytaxcategoryRoleandIncome {
  role: string;
  taxName: string;
  incomeOrTurnover: number;
  userType?: string;
}