import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  fetchBalances(): Observable<any> {
    return this.http.get(`/api/organizations/116302/ledger-balance/participant`);
  }

  fetchCrebits(): Observable<any> {
    return this.http.get(`/api/organizations/116302/crebitz?crebitCount=200&startDate=2014-04-01&endDate=2024-04-30&deactivatedRegistrations=true&splitAttributions=false`);
  }

}
// /api/organizations/${organization.id}/ledger-balance/participant`
