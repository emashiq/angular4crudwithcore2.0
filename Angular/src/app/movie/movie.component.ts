import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Movie }                from './Movie';
import { MovieService }         from './Movie.service';
@Component({
  providers: [MovieService],
  selector: 'app-root',
  templateUrl: './movie.component.html'
})
export class MovieComponent {
    movie:Movie[];
    selectedMovie: Movie;
    
    constructor(
      private MovieService: MovieService,
      private router: Router) { }
  
    getMovies(): void {
      this.MovieService
          .getMovies()
          .then(movies=>this.movie=movies);
    }
    //Get Data Using Obserable
    // getMovies(): void {
    //   this.MovieService
    //       .getMovies().subscribe(movies=>this.movie=movies);
    // }
    ngOnInit(): void {
      this.getMovies();
    }
}
