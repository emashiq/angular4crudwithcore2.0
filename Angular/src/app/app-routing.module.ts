import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent }   from './movie/movie.component';
import { AppComponent }      from './app.component';
import {MovieCreateComponent} from './movie/movie-create.component'
import {MovieEditComponent} from './movie/movie-edit.component'
const routes: Routes = [
  { path: '', component: MovieComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'movie/create', component: MovieCreateComponent },
  { path: 'movie/edit/:id', component: MovieEditComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}