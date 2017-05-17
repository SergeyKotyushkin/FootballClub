import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageModule } from './page.module';
import { CustomMaterialModule } from './custom-material.module';
import { PlayerListComponent } from '../components/player-list.component';

@NgModule({
    imports: [RouterModule, PageModule, CustomMaterialModule],
    declarations: [PlayerListComponent],
    exports: [PlayerListComponent]
})
export class PlayerListModule { }
