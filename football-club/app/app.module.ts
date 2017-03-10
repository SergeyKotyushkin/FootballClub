import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
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
import { PlayerListComponent }   from './components/player-list.component';
import 'hammerjs';

const appRoutes: Routes = [
  { path: 'players', component: PlayerListComponent },
];

@NgModule({
    imports:      [
      MaterialModule,
      BrowserModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      FlexLayoutModule.forRoot(),
      MdInputModule,
      MdCardModule,
      MdButtonModule,
      MdSelectModule,
      MdGridListModule
    ],
    declarations: [ AppComponent, PlayerListComponent ],
    bootstrap:    [ AppComponent ],
    providers: [MdInputContainer, MdIconRegistry]
})
export class AppModule { }
