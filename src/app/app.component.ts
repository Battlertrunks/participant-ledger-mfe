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
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)'
          ],
          hoverOffset: 4,
        }]
      },
      options: {
        cutout: '85%',
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Account Balance',
            font: {
              size: 20
            },
            padding: {
              top: 10,
              bottom: 10
            },
          },
        }
      }
    });
  }

}
