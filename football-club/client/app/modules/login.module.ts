import { NgModule } from '@angular/core';
import { PageModule } from './page.module';
import { CustomMaterialModule } from './custom-material.module';
import { LoginComponent } from '../components/login/login.component';
import { LoginLocalComponent } from '../components/login/login-local.component';

@NgModule({
    imports: [PageModule, CustomMaterialModule],
    declarations: [LoginComponent, LoginLocalComponent],
    exports: [LoginComponent]
})
export class LoginModule { }
