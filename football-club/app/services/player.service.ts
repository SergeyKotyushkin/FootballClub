import { Injectable } from '@angular/core';
import { PlayerViewModel } from '../view-models/player.view-model';
import { PlayerStatisticsViewModel } from '../view-models/player-statistics.view-model';

@Injectable()
export class PlayerService {

    getPlayers(withStatistics: boolean): Promise<PlayerViewModel[]> {
        return new Promise<PlayerViewModel[]>(
            (resolve, reject) => resolve(this._loadPlayersAsync(withStatistics)))
    }

    getPlayer(playerId: string): Promise<PlayerViewModel> {
        return new Promise<PlayerViewModel>(
            (resolve, reject) => resolve(this._loadPlayerAsync(playerId)))
    }

    private _loadPlayersAsync(withStatistics: boolean): PlayerViewModel[] {
        return PlayerService.mockPlayers;
    }

    private _loadPlayerAsync(playerId: string): PlayerViewModel {
        return PlayerService.mockPlayers.find(p => playerId === p.id);
    }

    static mockPlayers: PlayerViewModel[] = [
        new PlayerViewModel("1", "Sergey", "Kotyushkin", "attack", new PlayerStatisticsViewModel("1", 10, 4)),
        new PlayerViewModel("2", "Player1", "Surname1", "defender", new PlayerStatisticsViewModel("2", 3, 2)),
        new PlayerViewModel("3", "Player2", "Surname2", "goalkeeper", new PlayerStatisticsViewModel("3", 24, 20)),
        new PlayerViewModel("4", "Player3", "Surname3", "attack", new PlayerStatisticsViewModel("4", 109, 51)),
        new PlayerViewModel("5", "Player4", "Surname4", "defender", new PlayerStatisticsViewModel("5", 189, 76))
    ];
}
