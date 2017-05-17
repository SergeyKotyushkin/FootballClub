import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import 'hammerjs';

@NgModule({
    exports: [BrowserModule, BrowserAnimationsModule, FormsModule]
})
export class PageModule { }
