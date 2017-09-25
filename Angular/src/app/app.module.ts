import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
// Imports for loading & configuring the in-memory web api

import { AppComponent } from './app.component';
import {MovieComponent} from './movie/movie.component';
import {MovieCreateComponent} from './movie/movie-create.component';
import {MovieEditComponent} from './movie/movie-edit.component'
@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MovieCreateComponent,
    MovieEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }