import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Learn } from './learn.model';
import { BaseHttpService } from 'src/Utils/BaseHttp/base-http.service';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/Utils/interfaces/apiResponse';

@Injectable({ providedIn: 'root' })
export class LearnService extends BaseHttpService {

    constructor(public override httpClient?: HttpClient) {
        super()
    }
  getLearns(): Observable<ApiResponse<Learn[]>> {
    let con= environment.BaseUrl + environment.learn
    return this.get<ApiResponse<Learn[]>>(con);
  }



  addLearn(learn: Learn): Observable<Learn> {
    let con= environment.BaseUrl + environment.learn
    return this.post<Learn>(con, learn);
  }

  updateLearn(id: string, learn: Partial<Learn>): Observable<Learn> {
    let con= environment.BaseUrl + environment.learn   +`/${id}`;
    return this.patch<Learn>(con, learn);
  }

  deleteLearn(id: string): Observable<void> {
    let con= environment.BaseUrl + environment.learn   +`/${id}`;
    return this.delete<void>(con);
  }
}
