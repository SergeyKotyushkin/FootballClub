import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {
  MaterialModule,
  MdInputModule,
  MdCardModule,
  MdButtonModule,
  MdSelectModule,
  MdInputContainer,
  MdGridListModule
} from '@angular/material';
import { AppComponent }   from './components/app.component';
import 'hammerjs';

@NgModule({
    imports:      [
      MaterialModule,
      BrowserModule,
      FormsModule,
      MdInputModule,
      MdCardModule,
      MdButtonModule,
      MdSelectModule,
      MdGridListModule
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ],
    providers: [MdInputContainer]
})
export class AppModule { }
