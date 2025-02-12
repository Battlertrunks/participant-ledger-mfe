import { CurrencyPipe } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public NgZone: NgZone) {}

  ngOnInit() {
    this.createChart();
  }

  chart: any;

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'doughnut',
      data: {
        labels: ['Debits', 'Credits', 'Balance'],
        datasets: [{
          label: 'Account Balance',
          data: [100, 200, 300],
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
