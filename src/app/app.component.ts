import { CurrencyPipe, CommonModule } from '@angular/common';
import { Component, Inject, Input, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { FormsModule } from '@angular/forms';
import { LineItemsComponent } from './line-items/line-items.component';
import { DataService } from './data.service';

interface CrebitTotals {
  debits: string;
  credits: string;
  balance: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CurrencyPipe,
    CommonModule,
    FormsModule,
    LineItemsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    public NgZone: NgZone,
    private dataService: DataService,
    @Inject('singleSpaProps') private singleSpaProps: any
  ) {}

  crebitTotals!: CrebitTotals | undefined;
  totalSum: number = 0;

  ngOnInit() {
    this.dataService.setOrganization(this.singleSpaProps.org);

    // Fetch balances data
    // This is how we start async data fetching within Modern Angular
    // A subscribe is similar to a Promise.then() in JavaScript, but focusing on Observables.
    // An Observable is a representation of any set of values over any amount of time. It is basically a stream of data that can be processed with array-like operators.
    this.dataService.fetchBalances().subscribe({
      next: (data: any) => {
      this.crebitTotals = data;
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        this.createChart();

        // Should be refactor in a method loop
        if (this.crebitTotals) {
          this.crebitTotals.debits = parseInt(this.crebitTotals?.debits!).toFixed(2);
          this.crebitTotals.credits = parseInt(this.crebitTotals?.credits!).toFixed(2);
          this.crebitTotals.balance = parseInt(this.crebitTotals?.balance!).toFixed(2);
        }

        this.totalSum = parseInt(this.crebitTotals?.debits!) + parseInt(this.crebitTotals?.credits!) + parseInt(this.crebitTotals?.balance!);
      }
    });
  }


  // Get the percentage of the total debits sum
  get debitsPercentage() {
    return ((parseInt(this.crebitTotals?.debits!) / this.totalSum) * 100).toFixed(2);
  }

  // Get the percentage of the total credits sum
  get creditsPercentage() {
    return ((parseInt(this.crebitTotals?.credits!) / this.totalSum) * 100).toFixed(2);
  }

  // Get the percentage of the total balance sum
  get balancePercentage() {
    return ((parseInt(this.crebitTotals?.balance!) / this.totalSum) * 100).toFixed(2);
  }


  listItemsSelected: boolean = false;

  chart: any;

  // Create the chart
  createChart() {
    // Creating an instance of the Chart class
    this.chart = new Chart('MyChart', {
      type: 'doughnut',
      data: {
        labels: ['Debits', 'Credits', 'Balance'],
        datasets: [{
          label: 'Account Balance',
          data: [this.crebitTotals?.debits, this.crebitTotals?.credits, this.crebitTotals?.balance],
          backgroundColor: [
            'rgba(132, 255, 0, 0.75)',
            'rgba(128, 182, 70, 0.75)',
            'rgba(37, 138, 0, 0.75)'
          ],
          hoverOffset: 4,

        }]
      },
      options: {
        cutout: '65%',
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}
