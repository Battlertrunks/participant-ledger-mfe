import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DataService } from '../data.service';
import { CurrencyPipe } from '@angular/common';

const PAR_DATA = [
  {date: '04/24/2024', participant: 'Szczesniak, Gavin', description: 'TUITION test', debit: '$0.00', credit: ''},
  {date: '04/25/2024', participant: 'Szczesniak, Gavin', description: 'TUITION test', debit: '', credit: '$0.00'},
];

@Component({
  selector: 'app-line-items',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe],
  templateUrl: './line-items.component.html',
  styleUrl: './line-items.component.scss'
})
export class LineItemsComponent {
  constructor(private dataService: DataService) {}

  displayedColumns: string[] = ['date', 'participant', 'description', 'debit', 'credit'];
  dataSource: any;

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
}
