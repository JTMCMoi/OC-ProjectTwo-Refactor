import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medals-chart',
  standalone: true,
  imports: [],
  templateUrl: './medals-chart.component.html',
  styleUrl: './medals-chart.component.scss'
})

export class MedalsChartComponent implements OnChanges {
  @Input() countries: string[] = [];
  @Input() medals: number[] = [];
  public chart!: Chart<"pie", number[], string>;
  
  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ( !this.chart) {
      this.buildChart(this.countries,this.medals)
    }
    this.chart.data.labels = this.countries;
    this.chart.data.datasets[0].data = this.medals;
    this.chart.update();
  }

  private buildChart(countries: string[], medals: number[])
  {
    const chart = new Chart("medalschart", {
      type: 'pie',
      data: {
        labels: countries,
        datasets: [{
          label: 'Medals',
          data: this.medals,
          backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5,
        onClick: (e) => {
          if (e.native) {
            const points = chart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
            if (points.length) {
              const firstPoint = points[0];
              const countryName = chart.data.labels ? chart.data.labels[firstPoint.index] : '';
              this.router.navigate(['country', countryName]);
            }
          }
        }
      }
    });
    this.chart = chart;
  }
}