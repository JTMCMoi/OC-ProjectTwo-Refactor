import { Component,Input,OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-country-chart',
  standalone: true,
  imports: [],
  templateUrl: './country-chart.component.html',
  styleUrl: './country-chart.component.scss'
})
export class CountryChartComponent implements OnChanges {
  @Input() years: number[] = [];
  @Input() medals: string[] = [];
  public chart!: Chart<"line", string[], number>;

  ngOnChanges(changes: SimpleChanges): void {
    if ( !this.chart) {
      this.buildChart(this.years,this.medals)
    }
    this.chart.data.labels = this.years;
    this.chart.data.datasets[0].data = this.medals;
    this.chart.update();
  }

  buildChart(years: number[], medals: string[]) {
      const chart = new Chart("countrychart", {
        type: 'line',
        data: {
          labels: years,
          datasets: [
            {
              label: "medals",
              data: medals,
              backgroundColor: '#0b868f'
            },
          ]
        },
        options: {
          aspectRatio: 2.5
        }
      });
      this.chart = chart;
    }
}