export class PlayerStatisticsModel {

    public playerId: string;
    public gamesCount: number;
    public winsCount: number

    constructor(
        playerId: string,
        gamesCount: number,
        winsCount: number) {
          this.playerId = playerId;
          this.gamesCount = gamesCount;
          this.winsCount = winsCount;
    }
}
