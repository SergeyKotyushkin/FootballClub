import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MaterialModule,
  MdInputModule,
  MdCardModule,
  MdButtonModule,
  MdSelectModule,
  MdInputContainer,
  MdGridListModule,
  MdIconRegistry
} from '@angular/material';
import { AppComponent }   from './components/app.component';
import { AppRoutingModule }   from './app-routing.module';
import { PlayerListComponent }   from './components/player-list.component';
import { PlayerComponent }   from './components/player.component';
import { HomeComponent }   from './components/home.component';
import { NotFoundComponent }   from './components/not-found.component';
import 'hammerjs';

@NgModule({
    imports:      [
      MaterialModule,
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      FlexLayoutModule.forRoot(),
      MdInputModule,
      MdCardModule,
      MdButtonModule,
      MdSelectModule,
      MdGridListModule
    ],
    declarations: [
      AppComponent, PlayerListComponent, PlayerComponent, HomeComponent,
      NotFoundComponent
    ],
    bootstrap:    [ AppComponent ],
    providers: [MdInputContainer, MdIconRegistry]
})
export class AppModule { }
