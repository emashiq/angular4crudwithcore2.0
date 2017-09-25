import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute }            from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Movie }                from './Movie';
import { MovieService }         from './Movie.service';
@Component({
    providers:[MovieService],
    selector: 'movie-edit',    
    templateUrl:'./movie-create.component.html'
})
export class MovieEditComponent{
    movie=new Movie;
    form: FormGroup;
    message:string;
    id:number;
    constructor(private formBuilder: FormBuilder,
         private MovieService: MovieService,private route:Router,
         private ActivateRoute:ActivatedRoute
) { }
    ngOnInit(): void {
        this.ActivateRoute.params.subscribe( params => this.id=params['id'] );
        this.form = this.formBuilder.group({
            'title': [null, [Validators.required]],
            'genre': [null, [Validators.required]],
            'releaseDate': [null, [Validators.required]],
            'price': [null, [Validators]],
          });
        this.MovieService.getMovieById(this.id).then(x=>this.movie=x);
      }
      onSubmit(): void{
          this.movie.id=this.id;
          this.MovieService.updateMovie(this.movie, this.id)
        .then(x=>this.movie=x);
      this.message="Movie Updated";
      }
}