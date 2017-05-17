import { NgModule } from '@angular/core';
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
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    providers: [MdInputContainer, MdIconRegistry],
    exports: [
        MaterialModule,
        MdInputModule,
        MdCardModule,
        MdButtonModule,
        MdSelectModule,
        MdGridListModule,
        FlexLayoutModule
    ]
})
export class CustomMaterialModule { }
