import { PlayerStatisticsModel } from './player-statistics.model';

export class PlayerModel {

    public id: string;
    public name: string;
    public surname: string;
    public position: string;
    public playerStatistics: PlayerStatisticsModel;

    constructor(id: string, name: string, surname: string, position: string,
        playerStatistics: PlayerStatisticsModel = null) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.position = position;
        this.playerStatistics = playerStatistics;
    }
}
