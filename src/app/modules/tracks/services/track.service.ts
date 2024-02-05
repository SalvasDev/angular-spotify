import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  constructor(private httpClient:HttpClient) {}



// Método para utilizar y hacer un merge en el servicio
  private skipById(listTracks:TrackModel[],id:number):Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter(a => a._id !== id)
      resolve(listTmp)
    })
  }

  // Método para devolver todas las mejores canciones!!
  getAllTracks$():Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
      .pipe(
        map(({data}:any )=> {
          return data
        })
      )
  }
  //Devolver canciones random
  getAllRandom$():Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
      .pipe(
        tap(data => console.log('9999',data)),
          mergeMap(({data}:any )=> this.skipById(data,2)), //Devolvemos lista revertida
            tap(data => console.log('$$$$',data)),
              catchError((err) => {
                console.log('Algo salió mal');
                return of([])
              })
        // map((dataRevertida)=> {//Le podemos aplicar un filter común de array de javascript
        //   return dataRevertida.filter((track:TrackModel) => track._id !== 1)
        // })
      )
  }


}
