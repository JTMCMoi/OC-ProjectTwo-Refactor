import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { Olympic } from 'src/app/models/olympic';
import { Participation } from 'src/app/models/participation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public titlePage: string = "Medals per Country";
  public headers: {key: string; value: number}[] = [];
  public error!:string;
  public countriesNameList: string[] = [];
  public countriesMedalsCount!: number[];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getOlympics().subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.headers.push({key: 'Number of JOs',
            value: Array.from(new Set(data.map((i: Olympic) => i.participations.map((f: Participation) => f.year)).flat())).length
          });
          this.countriesNameList = data.map((i: Olympic) => i.country);
          this.headers.push({key: 'Number of countries',
            value: this.countriesNameList.length
          });
          const medals = data.map((i: Olympic) => i.participations.map((i: Participation) => (i.medalsCount)));
          this.countriesMedalsCount = medals.map((i) => i.reduce((acc: number, i: number) => acc + i, 0));
        }
      },
      (error) => {
        this.error = error.message
      }
    )
  }
}