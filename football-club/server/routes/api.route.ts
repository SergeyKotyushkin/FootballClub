import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../common/base.route';
import { PlayerModel } from '../../common/models/player.model';
import { PlayerStatisticsModel } from '../../common/models/player-statistics.model';
import { UserModel } from '../../common/models/user.model';
import { UserWrapperModel } from '../../common/models/user-wrapper.model';
import * as path from 'path';

export class ApiRoute extends BaseRoute {

    public static create(router: Router) {

        router.get("/api/players/:id", (req: Request, res: Response, next: NextFunction) => {
            let id: string = req.params.id.toString();
            new ApiRoute().player(req, res, next, id);
        });

        router.get("/api/players", (req: Request, res: Response, next: NextFunction) => {
            new ApiRoute().players(req, res, next);
        });

        router.get("/api/current-user", (req: Request, res: Response, next: NextFunction) => {
            new ApiRoute().currentUser(req, res, next);
        });
    }

    public constructor() {
        super();
    }

    private player(req: Request, res: Response, next: NextFunction, id: string) {
        let player = this._mockPlayers.find((p) => p.id === id);
        res.json(player);
    }

    private players(req: Request, res: Response, next: NextFunction) {
        res.json(this._mockPlayers);
    }

    private currentUser(req: Request, res: Response, next: NextFunction) {
        let user = <UserModel>req.user;
        let userWrapper = new UserWrapperModel();
        userWrapper.user = user;
        res.json(userWrapper);
    }

    private _mockPlayers: PlayerModel[] = [
        new PlayerModel("1", "Sergey", "Kotyushkin", "attack", new PlayerStatisticsModel("1", 10, 4)),
        new PlayerModel("2", "Player1", "Surname1", "defender", new PlayerStatisticsModel("2", 3, 2)),
        new PlayerModel("3", "Player2", "Surname2", "goalkeeper", new PlayerStatisticsModel("3", 24, 20)),
        new PlayerModel("4", "Player3", "Surname3", "attack", new PlayerStatisticsModel("4", 109, 51)),
        new PlayerModel("5", "Player4", "Surname4", "defender", new PlayerStatisticsModel("5", 189, 76))
    ];
}
