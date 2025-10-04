
import { HttpHeaders } from "@angular/common/http";

export class Constants {
  // headers
  httpHeader() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
     'Access-Control-Allow-Origin': '*',
    'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiI2MjRiMTg3NjQxOTZiYjAwMWE4ZWE0MjYiLCJhaWQiOiI2MjRjMTA4YjQxOTZiYjAwMWE4ZWE0MzUiLCJ0d29fZmEiOmZhbHNlLCJpbnN0YW5jZV9pZCI6IjYxMzZkZmE2YTFhYjlkMzE4YmNmY2I5NCIsImlzcyI6InNlbmRib3guYXBwcy5hdXRoLTYxMzZkZmE2YTFhYjlkMzE4YmNmY2I5NCIsImV4cCI6MTY1NDMzODY4M30.uBFec0sF4ktpK8rmIIy3PtCbBawzVc3qN7NOSb7Zomo'
        });
    return headers;
  }
}