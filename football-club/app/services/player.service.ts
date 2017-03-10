import { Injectable } from '@angular/core';
import { PlayerViewModel } from '../view-models/player.view-model';

@Injectable()
export class PlayerService {

    getPlayers(): Promise<PlayerViewModel[]> {
        return new Promise<PlayerViewModel[]>((resolve, reject) => resolve(this._loadPlayersAsync()))
    }

    private _loadPlayersAsync(): PlayerViewModel[] {
        return [
            new PlayerViewModel("1", "Sergey", "Kotyushkin", 10, "15%", "attack"),
            new PlayerViewModel("2", "Player1", "Surname1", 3, "70%", "defender"),
            new PlayerViewModel("3", "Player2", "Surname2", 24, "56%", "goalkeeper"),
            new PlayerViewModel("4", "Player3", "Surname3", 109, "39%", "attack"),
            new PlayerViewModel("5", "Player4", "Surname4", 189, "50%", "defender")
        ];
    }
}
