import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { PlayerModel } from '../models/player.model';
import { PlayerStatisticsModel } from '../models/player-statistics.model';
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
    public JSON;
    @ViewChild('donut') donut: ElementRef;

    public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType: string = 'doughnut';

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    constructor(
        private _playerService: PlayerService,
        private _playerStatisticsService: PlayerStatisticsService,
        private _route: ActivatedRoute,
        private _location: Location
    ) {
      this.JSON = JSON;
    }

    ngOnInit(): void {
        this._route.params
            .switchMap((params: Params) => this._playerService.getPlayer(params['id']))
            .subscribe(p => {
              this._onGetPlayer(p);
              this.doughnutChartData = [p.playerStatistics.winsCount, p.playerStatistics.gamesCount-p.playerStatistics.winsCount];
              this.doughnutChartLabels = ["Wins", "Loses"];
            });

        // let donutCtx = this.donut.nativeElement.getContext('2d');
        //
        // var data = {
        //     labels: [
        //         "Value A",
        //         "Value B"
        //     ],
        //     datasets: [
        //         {
        //             "data": [101342, 55342],   // Example data
        //             "backgroundColor": [
        //                 "#1fc8f8",
        //                 "#76a346"
        //             ]
        //         }]
        // };
        //
        // var chart = new Chart(
        //     donutCtx,
        //     {
        //         "type": 'doughnut',
        //         "data": data,
        //         "options": {
        //             "cutoutPercentage": 50,
        //             "animation": {
        //                 "animateScale": true,
        //                 "animateRotate": false
        //             }
        //         }
        //     }
        // );
    }

    private _onGetPlayer(playerModel: PlayerModel): void {
        this._playerModel = playerModel;
        this.playerViewModel = this._playerService.convertToPlayerViewModel(playerModel);
    }
}
