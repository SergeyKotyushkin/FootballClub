import { PlayerStatisticsViewModel } from './player-statistics.view-model';

export class PlayerViewModel {

    id: string;
    name: string;
    surname: string;
    position: string;
    playerStatistics: PlayerStatisticsViewModel;

    constructor(id: string, name: string, surname: string, position: string,
        playerStatistics: PlayerStatisticsViewModel = null) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.position = position;
        this.playerStatistics = playerStatistics;
    }
}
