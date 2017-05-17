import { Component } from '@angular/core';
import { PlayerListPlayerViewModel } from '../view-models/player-list-player.view-model';
import { PlayerService } from '../services/player.service';
import { PlayerStatisticsService } from '../services/player-statistics.service';
import { PlayerModel } from 'common/models/player.model';

@Component({
    moduleId: module.id,
    selector: 'player-list-content',
    templateUrl: '../templates/player-list.template.html',
    providers: [PlayerService, PlayerStatisticsService]
})
export class PlayerListComponent {

    public players: PlayerListPlayerViewModel[] = [];

    public constructor(private _playerService: PlayerService) {
        _playerService
            .getPlayers()
            .subscribe((players: PlayerModel[]) => {
                players.forEach(
                    (playerModel) => {
                        this.players.push(_playerService.convertToPlayerListPlayerViewModel(playerModel));
                    })
            }, console.log);
    }
}
