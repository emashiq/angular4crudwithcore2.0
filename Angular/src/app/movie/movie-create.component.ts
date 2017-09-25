import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Movie }                from './Movie';
import { MovieService }         from './Movie.service';

@Component({
    providers:[MovieService],
    selector: 'movie-create',    
    templateUrl:'./movie-create.component.html'
})
export class MovieCreateComponent{
    movie=new Movie;
    form: FormGroup;
    message:string;
    constructor(private formBuilder: FormBuilder, private MovieService: MovieService,private route:Router) { }
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'title': [null, [Validators.required]],
            'genre': [null, [Validators.required]],
            'releaseDate': [null, [Validators.required]],
            'price': [null, [Validators]],
          });
      }
      onSubmit(): void{
        this.MovieService.createMovies(this.movie)
        .then(movie => this.movie = movie);
        this.movie=new Movie;
        this.message='Movie is saved';
      }
      
}