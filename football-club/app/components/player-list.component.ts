import { Component } from '@angular/core';
import { PlayerViewModel } from '../view-models/player.view-model';
import { PlayerService } from '../services/player.service';

@Component({
    selector: 'player-list-app',
    templateUrl: './app/templates/player-list.component.html',
    providers: [PlayerService]
})
export class PlayerListComponent {

    players: PlayerViewModel[] = [];

    constructor(private playerService: PlayerService) {
        playerService.getPlayers().then(players => this.players = players);
    }
}
