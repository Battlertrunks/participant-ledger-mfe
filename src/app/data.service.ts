import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private organization = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  setOrganization(organization: any) {
    this.organization.next(organization);
  }

  getOrganization(): Observable<any> {
    return this.organization.asObservable();
  }

  fetchBalances(): Observable<any> {
    return this.http.get(`/api/organizations/116302/ledger-balance/participant`);
  }

  fetchCrebits(searchFilters: any = null): Observable<any> {
    console.log(searchFilters);
    if (searchFilters) {
      const { searchText, filters } = searchFilters;
      return this.http.get(`/api/organizations/116302/crebitz?${searchText ? 'text=' + searchFilters + '&' : ''}${filters}`);
    } else {
      return this.http.get(`/api/organizations/116302/crebitz?crebitCount=200&startDate=2014-04-01&endDate=2025-02-18&deactivatedRegistrations=true&splitAttributions=false`);
    }
  }

}
// /api/organizations/${organization.id}/ledger-balance/participant`
