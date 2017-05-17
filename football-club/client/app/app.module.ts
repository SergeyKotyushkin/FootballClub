import { NgModule }      from '@angular/core';
import { PageModule }   from './modules/page.module';
import { HomeModule }   from './modules/home.module';
import { NotFoundModule }   from './modules/not-found.module';
import { PlayerListModule }   from './modules/player-list.module';
import { PlayerModule }   from './modules/player.module';
import { LoginModule }   from './modules/login.module';
import { AppRoutingModule }   from './app-routing.module';
import { CustomMaterialModule } from './modules/custom-material.module';
import { AppComponent }   from './components/app.component';
import { CanActivateUnAuthenticated }   from './helpers/can-activate-un-authenticated.helper';

@NgModule({
    imports: [
        PageModule,
        HomeModule,
        NotFoundModule,
        PlayerListModule,
        PlayerModule,
        LoginModule,
        AppRoutingModule,
        CustomMaterialModule
    ],
    declarations: [AppComponent],
    providers: [CanActivateUnAuthenticated],
    bootstrap: [AppComponent]
})
export class AppModule { }
