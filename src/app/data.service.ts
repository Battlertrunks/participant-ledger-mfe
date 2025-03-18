import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Type of Subject that remembers and shares the most recent value with new subscribers
  private organization = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  // Method to set the organization
  setOrganization(organization: any) {
    this.organization.next(organization);
  }

  // Method to get the organization
  getOrganization(): Observable<any> {
    return this.organization.asObservable();
  }

  // Method to fetch balances
  fetchBalances(): Observable<any> {
    return this.http.get(`/api/organizations/116302/ledger-balance/participant`);
  }

  // Method to fetch crebits
  fetchCrebits(searchFilters: any = null): Observable<any> {
    console.log(searchFilters);
    if (searchFilters && (searchFilters.searchText || searchFilters.filters)) {
      const { searchText, filters } = searchFilters;
      return this.http.get(`/api/organizations/116302/crebitz?${searchText ? 'text=' + searchText + '&' : ''}${filters}`);
    } else {
      return this.http.get(`/api/organizations/116302/crebitz?crebitCount=200&startDate=2014-04-01&endDate=2025-02-18&deactivatedRegistrations=true&splitAttributions=false`);
    }
  }

}
