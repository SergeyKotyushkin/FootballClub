import { Injectable } from '@angular/core';
import { PlayerModel } from '../models/player.model';
import { PlayerStatisticsModel } from '../models/player-statistics.model';
import { PlayerViewModel } from '../view-models/player.view-model';
import { PlayerStatisticsViewModel } from '../view-models/player-statistics.view-model';
import { PlayerListPlayerViewModel } from '../view-models/player-list-player.view-model';
import { PlayerStatisticsService } from './player-statistics.service';

@Injectable()
export class PlayerService {

    constructor(
        private _playerStatisticsService: PlayerStatisticsService) { }

    getPlayers(withStatistics: boolean): Promise<PlayerModel[]> {
        return new Promise<PlayerModel[]>(
            (resolve, reject) => resolve(this._loadPlayersAsync(withStatistics)))
    }

    getPlayer(playerId: string): Promise<PlayerModel> {
        return new Promise<PlayerModel>(
            (resolve, reject) => resolve(this._loadPlayerAsync(playerId)))
    }

    convertToPlayerViewModel(playerModel: PlayerModel): PlayerViewModel {
        return new PlayerViewModel(
            playerModel.id,
            playerModel.name,
            playerModel.surname,
            playerModel.position,
            this._playerStatisticsService.convertToViewModel(playerModel.playerStatistics)
        );
    }

    convertToPlayerListPlayerViewModel(playerModel: PlayerModel): PlayerListPlayerViewModel {
        return new PlayerListPlayerViewModel(
            playerModel.id,
            playerModel.name,
            playerModel.surname,
            playerModel.position,
            this._playerStatisticsService.convertToViewModel(playerModel.playerStatistics)
        );
    }

    private _loadPlayersAsync(withStatistics: boolean): PlayerModel[] {
        return PlayerService.mockPlayers;
    }

    private _loadPlayerAsync(playerId: string): PlayerModel {
        return PlayerService.mockPlayers.find(p => playerId === p.id);
    }

    static mockPlayers: PlayerModel[] = [
        new PlayerModel("1", "Sergey", "Kotyushkin", "attack", new PlayerStatisticsModel("1", 10, 4)),
        new PlayerModel("2", "Player1", "Surname1", "defender", new PlayerStatisticsModel("2", 3, 2)),
        new PlayerModel("3", "Player2", "Surname2", "goalkeeper", new PlayerStatisticsModel("3", 24, 20)),
        new PlayerModel("4", "Player3", "Surname3", "attack", new PlayerStatisticsModel("4", 109, 51)),
        new PlayerModel("5", "Player4", "Surname4", "defender", new PlayerStatisticsModel("5", 189, 76))
    ];
}
