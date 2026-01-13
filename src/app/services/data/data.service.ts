import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,shareReplay,catchError,throwError } from 'rxjs';
import { Olympic } from 'src/app/models/olympic';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = './assets/mock/olympic.json';
  private olympics$! : Observable<Olympic[]>;

  constructor(private http: HttpClient) { }

  getOlympics() : Observable<Olympic[]> {

    if ( !this.olympics$ )
    {
      //Emmet une seule fois et ne nécessite donc pas de gestion de l'observable
      this.olympics$ = this.http.get<Olympic[]>(this.url).pipe(
        shareReplay(1),
        catchError((r:HttpErrorResponse) => throwError(() => new Error(`Erreur on getting datas (${r.message})`)))
      );
    }

    return this.olympics$;

  }
}