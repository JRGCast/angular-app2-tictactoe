import { Component, OnInit, Input } from '@angular/core';

interface PlayerObj {
  playerName: string,
  playerSign: 'X' | 'O',
  playerPoints: 0
}

@Component({
  selector: 'ticTacToe-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() public player1: PlayerObj = {
    playerName: 'Player 1',
    playerSign: 'X',
    playerPoints: 0
  }
  @Input() public player2: PlayerObj = {
    playerName: 'Player 2',
    playerSign: 'O',
    playerPoints: 0
  }
  public allSquares!: Array<string>
  private xTurn!: boolean
  public theWinner!: string | null
  public showBoard: boolean = false
  constructor() { }

  ngOnInit(): void {
    // this.newGame()
  }

  public newGame(): void {
    this.allSquares = Array(9).fill('')
    this.theWinner = null
    this.xTurn = true
    this.showBoard = true
    console.log('pressed', this.showBoard)
  }

  public playerNaming(currPlayer: 1 | 2, name: Event | null): void {
    this[`player${ currPlayer }`].playerName = (<HTMLInputElement>name?.target)?.value
  }

  get currPlayer(): PlayerObj {
    return this.xTurn ?
      this.player1 : this.player2
  }

  public playerAction(index: number): void {
    if (!this.allSquares[index]) {
      this.allSquares.splice(index, 1, this.currPlayer.playerSign)
      this.getTheWinner()
      this.xTurn = !this.xTurn
    }
  }
  public getTheWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.allSquares[a] &&
        this.allSquares[a] === this.allSquares[b] &&
        this.allSquares[a] === this.allSquares[c]
      ) {
        if (this.xTurn) {
          this.player1.playerPoints += 1;
          this.theWinner = this.player1.playerName

        } else {
          this.player2.playerPoints += 1;
          this.theWinner = this.player2.playerName
        }
        this.showBoard = false
      }
    }
    return null;
  }
}
