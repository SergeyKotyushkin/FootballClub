export class PlayerStatisticsViewModel {

    public playerId: string;
    public gamesCount: number;
    public winsCount: number;
    public winsPercent: string;

    constructor(
        playerId: string,
        gamesCount: number,
        winsCount: number,
        winsPercent: string) {

        this.playerId = playerId;
        this.gamesCount = gamesCount;
        this.winsCount = winsCount;
        this.winsPercent = winsPercent;
    }
}
