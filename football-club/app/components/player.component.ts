import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { PlayerViewModel } from '../view-models/player.view-model';
import { PlayerService } from '../services/player.service';

@Component({
    moduleId: module.id,
    selector: 'player-content',
    templateUrl: '../templates/player.template.html',
    providers: [PlayerService]
})
export class PlayerComponent implements OnInit {

    player: PlayerViewModel = null;

    constructor(
        private _playerService: PlayerService,
        private _route: ActivatedRoute,
        private _location: Location
    ) { }

    ngOnInit(): void {
        this._route.params
            .switchMap((params: Params) => this._playerService.getPlayer(params['id']))
            .subscribe(p => this.player = p);
    }
}
