import { Component } from '@angular/core';

class PlayerViewModel {
    constructor(public name: string, public surname: string,
        public gamesCount: number, public winPercent: string,
        public position: string) { }
}

@Component({
    selector: 'player-list-app',
    templateUrl: './app/templates/player-list.component.html'
})
export class PlayerListComponent {

  players: PlayerViewModel[] = [
     new PlayerViewModel("Sergey", "Kotyushkin", 10, "15%", "attack"),
     new PlayerViewModel("Player1", "Surname1", 3, "70%", "defender"),
     new PlayerViewModel("Player2", "Surname2", 24, "56%", "goalkeeper"),
     new PlayerViewModel("Player3", "Surname3", 109, "39%", "attack"),
     new PlayerViewModel("Player4", "Surname4", 189, "50%", "defender")
  ];

  constructor() {
  }
}
