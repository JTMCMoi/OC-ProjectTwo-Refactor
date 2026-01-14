import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { Olympic } from 'src/app/models/olympic';
import { Participation } from 'src/app/models/participation';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  public titlePage?: string = '';
  public headers: {key: string; value: number}[] = [];
  public error!: string;
  public years: number[] = [];
  public medals: string[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    let countryName: string | null = null
    countryName = this.route.snapshot.paramMap.get('countryName');
    this.dataService.getOlympics().subscribe(
      (data) => {
        if (data && data.length > 0) {
          const selectedCountry = data.find((i: Olympic) => i.country === countryName);
          this.titlePage = selectedCountry?.country;
          const participations = selectedCountry?.participations.map((i: Participation) => i);
          this.headers.push({key: 'Number of entries',
            value: participations?.length ?? 0
          });
          this.years = selectedCountry?.participations.map((i: Participation) => i.year) ?? [];
          this.medals = selectedCountry?.participations.map((i: Participation) => i.medalsCount.toString()) ?? [];
          this.headers.push({key: 'Total Number of medals',
            value: this.medals.reduce((accumulator: number, item: string) => accumulator + parseInt(item), 0)
          });
          const nbAthletes = selectedCountry?.participations.map((i: Participation) => i.athleteCount.toString()) ?? []
          this.headers.push({key: 'Total Number of athletes',
            value: nbAthletes.reduce((accumulator: number, item: string) => accumulator + parseInt(item), 0)
          });
        }
      },
      (error) => {
        this.error = error.message
      }
    );
  }
}