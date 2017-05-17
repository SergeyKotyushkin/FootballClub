import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerListComponent }   from './components/player-list.component';
import { PlayerComponent }   from './components/player.component';
import { LoginComponent }   from './components/login/login.component';
import { HomeComponent }   from './components/home.component';
import { NotFoundComponent }   from './components/not-found.component';
import { CanActivateUnAuthenticated }   from './helpers/can-activate-un-authenticated.helper';

const routes: Routes = [
    { path: 'players', component: PlayerListComponent },
    { path: 'player/:id', component: PlayerComponent },
    { path: 'login', component: LoginComponent, canActivate: [CanActivateUnAuthenticated] },
    { path: '', component: HomeComponent},
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
