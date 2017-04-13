import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ChartsModule } from 'ng2-charts';
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
      BrowserAnimationsModule,
      FormsModule,
      AppRoutingModule,
      FlexLayoutModule.forRoot(),
      ChartsModule,
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
