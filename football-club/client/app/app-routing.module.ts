import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerListComponent }   from './components/player-list.component';
import { PlayerComponent }   from './components/player.component';
import { HomeComponent }   from './components/home.component';
import { NotFoundComponent }   from './components/not-found.component';

const routes: Routes = [
    { path: 'players', component: PlayerListComponent },
    { path: 'player/:id', component: PlayerComponent },
    { path: '', component: HomeComponent},
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
