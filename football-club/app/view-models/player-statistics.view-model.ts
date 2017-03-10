export class PlayerStatisticsViewModel {
    constructor(
        public playerId: string,
        public gamesCount: number,
        public winsCount: number) { }


    getWinsPercent(): string {
        if (this == null) {
            return "";
        }

        return `${Math.round(this.winsCount * 100 / this.gamesCount)}%`;
    }
}
