import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Movie} from './Movie'
@Injectable()
export class MovieService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private heroesUrl = 'http://localhost:5000/api/GetAllMovies';
    private heroesUrlCreate = 'http://localhost:5000/api/movies';
    constructor(private http: Http) { }
      getMovies(): Promise<Movie[]> {
        return this.http.get(this.heroesUrl)
                   .toPromise()
                   .then(response => response.json() as Movie[])
                   .catch(this.handleError);
      }
      updateMovie(movie:Movie,id:number):Promise<Movie>
      {
        this.heroesUrlCreate=`http://localhost:5000/api/movies?id=${id}`;
        return this.http
        .put(this.heroesUrlCreate, JSON.stringify(movie), {headers: this.headers})
        .toPromise()
        .then(res=>res.json() as Movie)
        .catch(this.handleError);
      }
      getMovieById(id:number):Promise<Movie>{
        this.heroesUrlCreate=`http://localhost:5000/api/movies?id=${id}`;
        return this.http.get(this.heroesUrlCreate)
        .toPromise()
        .then(response => response.json() as Movie)
        .catch(this.handleError);
      }
      createMovies(movie:Movie):Promise<Movie>
      {
        return this.http
        .post(this.heroesUrlCreate, JSON.stringify(movie), {headers: this.headers})
        .toPromise()
        .then(res => res.json() as Movie)
        .catch(this.handleError);
      }
      private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }
         //Get Data Using Observeable
      // getMovies(): Observable<Movie[]> {
      //   return this.http.get(this.heroesUrl)
      //              .map(response =>{
      //               return response.json() as Movie[]
      //              }
      //                );
      // }
}