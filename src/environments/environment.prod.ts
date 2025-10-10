export const environment = {
  production: true,
  BaseUrl: "http://localhost:7777/",
  getTaxCategory: "tax-data/categories",
  getTaxRoles: "tax-data/roles",
  getTaxByCategory: "tax-category",
  getTaxByRole: "tax-data/by-role/",
  getTaxReform: "tax-reform",
  getTaxReformByRole: "tax-reform/role/",  // GET /tax-reform/role/:roleTitle → Get by role
  getTaxReformByCategory: "tax-reform/category/",// /tax-reform/category/:category
  GetTaxReformByTaxCategory: "tax-reform/tax-category/", // tax-reform/tax-category/:taxCategory → Get by tax type
  getRoles: "taxreform/role",
  getTaxByRoleAndIncome: 'taxreform/getTaxByRoleAndIncome',
  //learn 
  learn:'learn'
  
};
