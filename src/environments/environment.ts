// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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
  getTaxByRoleAndIncome: 'taxreform/getTaxByRoleAndIncome'




};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
