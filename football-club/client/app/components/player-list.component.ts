import { Component } from '@angular/core';
import { PlayerListPlayerViewModel } from '../view-models/player-list-player.view-model';
import { PlayerService } from '../services/player.service';
import { PlayerStatisticsService } from '../services/player-statistics.service';

@Component({
    moduleId: module.id,
    selector: 'player-list-content',
    templateUrl: '../templates/player-list.template.html',
    providers: [PlayerService, PlayerStatisticsService]
})
export class PlayerListComponent {

    players: PlayerListPlayerViewModel[] = [];

    constructor(private _playerService: PlayerService) {
        let withStatistics = true;
        _playerService
            .getPlayers(withStatistics)
            .then(players => players.forEach(
                (playerModel) => {
                    this.players.push(_playerService.convertToPlayerListPlayerViewModel(playerModel));
                })
            );
    }
}
