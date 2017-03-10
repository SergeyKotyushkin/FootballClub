import { Component } from '@angular/core';
import { PlayerViewModel } from '../view-models/player.view-model';
import { PlayerService } from '../services/player.service';

@Component({
    moduleId: module.id,
    selector: 'player-list-content',
    templateUrl: '../templates/player-list.template.html',
    providers: [PlayerService]
})
export class PlayerListComponent {

    players: PlayerViewModel[] = [];

    constructor(private _playerService: PlayerService) {
      let withStatistics = true;
      _playerService
          .getPlayers(withStatistics)
          .then(players => this.players = players);
    }
}
