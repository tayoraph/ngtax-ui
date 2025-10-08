import { HttpHeaders } from "@angular/common/http";

export class Constants {
  // headers
  httpHeader() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
     'Access-Control-Allow-Origin': '*',
    'Authorization': ''
        });
    return headers;
  }
}