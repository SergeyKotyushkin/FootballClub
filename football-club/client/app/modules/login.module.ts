import { NgModule } from '@angular/core';
import { PageModule } from './page.module';
import { CustomMaterialModule } from './custom-material.module';
import { LoginComponent } from '../components/login/login.component';
import { LoginLocalComponent } from '../components/login/login-local.component';
import { LoginGoogleComponent } from '../components/login/login-google.component';
import { LoginVkComponent } from '../components/login/login-vk.component';
import { LoginIFrameDialogComponent } from '../components/login/login-iframe-dialog.component';

@NgModule({
    imports: [PageModule, CustomMaterialModule],
    declarations: [
        LoginComponent,
        LoginLocalComponent,
        LoginGoogleComponent,
        LoginVkComponent,
        LoginIFrameDialogComponent],
    entryComponents: [LoginIFrameDialogComponent],
    exports: [LoginComponent]
})
export class LoginModule { }
