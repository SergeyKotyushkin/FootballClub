import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { PageModule } from './page.module';
import { CustomMaterialModule } from './custom-material.module';
import { PlayerComponent } from '../components/player.component';

@NgModule({
    imports: [ChartsModule, PageModule, CustomMaterialModule],
    declarations: [PlayerComponent],
    exports: [PlayerComponent]
})
export class PlayerModule { }
