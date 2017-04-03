import { Injectable } from '@angular/core';
import { PlayerStatisticsModel } from '../models/player-statistics.model';
import { PlayerStatisticsViewModel } from '../view-models/player-statistics.view-model';

@Injectable()
export class PlayerStatisticsService {

    getWinsPercent(playerStatistics: PlayerStatisticsModel): string {
        if (playerStatistics == null) {
            return "";
        }

        return `${Math.round(playerStatistics.winsCount * 100 / playerStatistics.gamesCount)}%`;
    }

    convertToViewModel(playerStatisticsModel: PlayerStatisticsModel): PlayerStatisticsViewModel {
        return new PlayerStatisticsViewModel(
            playerStatisticsModel.playerId,
            playerStatisticsModel.gamesCount,
            playerStatisticsModel.winsCount,
            this.getWinsPercent(playerStatisticsModel)
        );
    }
}
