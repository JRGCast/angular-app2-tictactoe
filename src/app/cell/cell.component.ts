import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ticTacToe-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() public cellValue!: 'X' | 'O' | string
  constructor() { }

  ngOnInit(): void {
  }

}
