import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DataService } from '../data.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { FiltersWidgetComponent } from '../filters-widget/filters-widget.component';

@Component({
  selector: 'app-line-items',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe, FormsModule, FiltersWidgetComponent],
  templateUrl: './line-items.component.html',
  styleUrl: './line-items.component.scss'
})
export class LineItemsComponent {
  private searchTerm = new Subject<any>();

  constructor(private dataService: DataService) {
    this.searchTerm.pipe(
      debounceTime(500),
      switchMap((term, filters) => {
        return this.dataService.fetchCrebits(term)
      })
    ).subscribe({
      next: data => {
          this.dataSource = data;
        },
        error: (error: any) => {
          console.error('There was an error!', error);
        }
    });
  }

  displayedColumns: string[] = ['date', 'participant', 'description', 'debit', 'credit'];
  dataSource: any;

  searchLineItem: string = '';

  isFiltering: boolean = false;

  organization: any;

  ngOnInit() {
    // Fetch organization data
    this.dataService.getOrganization().subscribe((organization) => {
      console.log(organization);
      this.organization = organization;
    });

    // Fetch crebits data
    this.dataService.fetchCrebits().subscribe({
      next: (data: any) => {
        this.dataSource = data;
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log(this.dataSource);
      }
    });
  }

  // Searches for line items based on the search term and filters
  onSearchChange(lineItemSearch: string, filters: string) {
    this.searchTerm.next({ searchText: lineItemSearch, filters: filters});
  }

  // Toggles the filters widget
  toggleFilters() {
    this.isFiltering = !this.isFiltering;
  }
}
