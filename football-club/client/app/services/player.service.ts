import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpHelper } from 'common/helpers/http.helper';
import { PlayerModel } from 'common/models/player.model';
import { PlayerStatisticsModel } from 'common/models/player-statistics.model';
import { PlayerViewModel } from '../view-models/player.view-model';
import { PlayerStatisticsViewModel } from '../view-models/player-statistics.view-model';
import { PlayerListPlayerViewModel } from '../view-models/player-list-player.view-model';
import { PlayerStatisticsService } from './player-statistics.service';

@Injectable()
export class PlayerService {
    private static _playersUrl: string = 'api/players';

    public constructor(
        private _http: Http,
        private _playerStatisticsService: PlayerStatisticsService) { }

    public getPlayers(): Observable<PlayerModel[]> {
        return this._loadPlayersAsync();
    }

    public getPlayer(playerId: string): Observable<PlayerModel> {
        return this._loadPlayerAsync(playerId);
    }

    public convertToPlayerViewModel(playerModel: PlayerModel): PlayerViewModel {
        return new PlayerViewModel(
            playerModel.id,
            playerModel.name,
            playerModel.surname,
            playerModel.position,
            this._playerStatisticsService.convertToViewModel(playerModel.playerStatistics)
        );
    }

    public convertToPlayerListPlayerViewModel(playerModel: PlayerModel): PlayerListPlayerViewModel {
        return new PlayerListPlayerViewModel(
            playerModel.id,
            playerModel.name,
            playerModel.surname,
            playerModel.position,
            this._playerStatisticsService.convertToViewModel(playerModel.playerStatistics)
        );
    }


    private _loadPlayersAsync(): Observable<PlayerModel[]> {
        return this._http.get(PlayerService._playersUrl)
            .map((res: Response) => HttpHelper.extractArrayData(res))
            .catch((res: Response) => HttpHelper.handleError(res));
    }

    private _loadPlayerAsync(playerId: string): Observable<PlayerModel> {
        let playerUrl: string = `${PlayerService._playersUrl}/${playerId}`;
        return this._http.get(playerUrl)
            .map((res: Response) => HttpHelper.extractObjectData(res))
            .catch((res: Response) => HttpHelper.handleError(res));
    }
}
