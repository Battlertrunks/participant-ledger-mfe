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

  private searchTerm = new Subject<string>();

  constructor(private dataService: DataService) {
    this.searchTerm.pipe(
      debounceTime(500),
      switchMap(term => {
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

  ngOnInit() {
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

  onSearchChange(lineItemSearch: string) {
    this.searchTerm.next(lineItemSearch);
  }

  toggleFilters() {
    this.isFiltering = !this.isFiltering;
  }
}
