import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { PlayerModel } from 'common/models/player.model';
import { PlayerStatisticsModel } from 'common/models/player-statistics.model';
import { PlayerViewModel } from '../view-models/player.view-model';
import { PlayerService } from '../services/player.service';
import { PlayerStatisticsService } from '../services/player-statistics.service';

@Component({
    moduleId: module.id,
    selector: 'player-content',
    templateUrl: '../templates/player.template.html',
    providers: [PlayerService, PlayerStatisticsService]
})
export class PlayerComponent implements OnInit {

    private _playerModel: PlayerModel;

    public playerViewModel: PlayerViewModel;

    public chartWinLoses = {
        labels: ["Wins", "Loses"],
        colors: [{ backgroundColor: ["#c25", "#25c"] }],
        data: null,
        type: 'doughnut',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: true,
              position: 'bottom',
              fullWidth: true,
              labels: {
                fontStyle: 'bold'
              }
            }
        }
    };

    constructor(
        private _playerService: PlayerService,
        private _playerStatisticsService: PlayerStatisticsService,
        private _route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this._route.params
            .switchMap((params: Params) => this._playerService.getPlayer(params['id']))
            .subscribe(p => {
                this._onGetPlayer(p);
                this._createChartWinLoses(p.playerStatistics);
            });
    }

    private _onGetPlayer(playerModel: PlayerModel): void {
        this._playerModel = playerModel;
        this.playerViewModel = this._playerService.convertToPlayerViewModel(playerModel);
    }

    private _createChartWinLoses(playerStatistics: PlayerStatisticsModel): void {
        this.chartWinLoses.data = [
            playerStatistics.winsCount,
            playerStatistics.gamesCount - playerStatistics.winsCount];
    }
}
