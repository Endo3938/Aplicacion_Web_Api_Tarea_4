import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import Models from './animes/animes.model';

@Injectable({
  providedIn: 'root'
})
export class FindAnimeService {

  private _animes = new BehaviorSubject<Models.Animes>(new Models.Animes("", false, 0, [], 0));
  private apiAnimes: Models.Animes | undefined

  constructor(private http: HttpClient) { }


  getAnimes(){
    return this._animes.asObservable();
  }

  fetchAnimes(nombre : string, filtro : string, page : number)
  {
    console.log(`${environment.apiURLAnime}q=${nombre}&page=${page}&rated=${filtro}`);
    return this.http.get<Models.Animes>(`${environment.apiURLAnime}q=${nombre}&page=${page}&rated=${filtro}`);
  }
}
