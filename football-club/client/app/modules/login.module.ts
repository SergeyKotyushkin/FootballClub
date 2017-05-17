import { NgModule } from '@angular/core';
import { PageModule } from './page.module';
import { CustomMaterialModule } from './custom-material.module';
import { LoginComponent } from '../components/login.component';

@NgModule({
    imports: [PageModule, CustomMaterialModule],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})
export class LoginModule { }
