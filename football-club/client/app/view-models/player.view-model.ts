import { PlayerStatisticsViewModel } from './player-statistics.view-model';

export class PlayerViewModel {

    id: string;
    name: string;
    surname: string;
    position: string;
    playerStatisticsViewModel: PlayerStatisticsViewModel;

    constructor(id: string, name: string, surname: string, position: string,
        playerStatisticsViewModel: PlayerStatisticsViewModel = null) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.position = position;
        this.playerStatisticsViewModel = playerStatisticsViewModel;
    }
}
