import React, { Component } from 'react';
import Menu from './Menu';

class Battleship extends Component {
  constructor() {
    super();
    this.fire = this.fire.bind(this);
    this.computerFire = this.computerFire.bind(this);
    this.pickShip = this.pickShip.bind(this);
    this.placeShip = this.placeShip.bind(this);
    this.collidesWithShip = this.collidesWithShip.bind(this);
    this.start = this.start.bind(this);
    this.placeComputerShips = this.placeComputerShips.bind(this);
    this.allShipsPlaced =  this.allShipsPlaced.bind(this);
    this.state= {
      playerTurn: 0,
      selectedShip: {name: "aircraftCarrier", orientation: "h"},
      playerShips: {
        aircraftCarrier: { length: 5, symbol: 'A', isPlaced: false },
        battleship: { length: 4, symbol: 'B', isPlaced: false },
        submarine: { length: 3, symbol: 'S', isPlaced: false },
        cruiser: { length: 3, symbol: 'C',isPlaced: false },
        destroyer: { length: 2, symbol: 'D',isPlaced: false }
      },
      playerBoard: [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '']
      ],
      computerBoard: [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '']
      ],
      playerHealth: 17,
      computerHealth: 17,
      computerMoves: []
    }
  }

  pickShip(name, orientation) {
    this.setState({
      selectedShip: {name: name, orientation: orientation }
    })
  }
  collidesWithShip(cellIndex, rowIndex, length, board, orientation){
    if (orientation === "h") {
      let testArea = board[rowIndex].slice(cellIndex, (cellIndex+length));
      return testArea.some(cell => cell !== "")
    } else {
      let testArea = []
      for (var i = 0; i < length; i++) {
        testArea.push(board[rowIndex + i][cellIndex])
      }
      return testArea.some(cell => cell !== "")
    }
  }
  placeShip(e) {
    // finds the index of the cell clicked on and places the letter reprenseting the ship
    const cellIndex = parseInt(e.target.getAttribute("data-cell-id"), 10);
    const rowIndex = parseInt(e.currentTarget.getAttribute("data-row-id"), 10);
    const board = this.state.playerBoard.slice();
    const name = this.state.selectedShip.name;
    const orientation = this.state.selectedShip.orientation;
    const length = this.state.playerShips[name].length;
    const symbol = this.state.playerShips[name].symbol;
    const occupied = this.collidesWithShip(cellIndex, rowIndex, length, board, orientation)
    // its easier to make a copy of the playerShips (by spreading into ships)
    // change one ship in the object and then set state for the parent object
    const ships = {...this.state.playerShips}

    if (this.state.playerShips[name].isPlaced === true) {
      alert("You have already placed this ship");
      return
    } else {
      if (cellIndex + length > 10){
        alert(`There is not enough room on the board to place the ${name}.`)
      } else if (rowIndex + length > 10) {
        alert(`There is not enough vertical space on the board to place the ${name}`)
      } else if (occupied) {
        alert("You can not place a ship on top of another ship!")
      } else {
        board[rowIndex][cellIndex] = symbol;
        if (orientation === "h") {
          for (var i = 1; i < length; i++) {
            board[rowIndex][cellIndex + i] = symbol;
          }
        } else if (orientation === "v") {
          for (var j = 1; j < length; j++) {
            board[rowIndex + j][cellIndex] = symbol;
          }
        }
        ships[name].isPlaced = true

        this.setState({
          playerBoard: board,
          playerShips: ships
        })
      }
    }
  }

  allShipsPlaced(){
    const ships = {...this.state.playerShips};
    const names = Object.keys(this.state.playerShips);
    let arrayShips = names.map((name) => ships[name] );
    return arrayShips.every(ship => ship.isPlaced === true)
  }

  fire(e) {
    if (this.allShipsPlaced()){
      const row = e.currentTarget.getAttribute("data-row-id")
      const cell = e.target.getAttribute("data-cell-id")
      const board = this.state.computerBoard.slice();
      let computerHealth = this.state.computerHealth;
      if ((this.state.computerBoard[row][cell]).split("").some(char => char === "f")) {
        alert("You have already fired here.")
      } else if(this.state.computerBoard[row][cell] === ''){
        e.target.classList.add('miss');
      } else {
        e.target.classList.add('hit');
        computerHealth -= 1;
        this.setState({
          computerHealth: computerHealth
        })
      };
      board[row][cell] = board[row][cell] + "f";
      this.setState({
        computerBoard: board
      });
      this.computerFire();
    } else {
      alert("You must have placed all of your ships before firing.")
    }
  }

  computerFire() {
    const playerBoard = [...this.state.playerBoard]
    let playerHealth = this.state.playerHealth;
    let moves = [...this.state.computerMoves]
    const potentialMoves= [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]]
    // takes the array of potentialMoves and subtracts all moves already made (which are stored in state)
    let possibleMoves = potentialMoves.filter(function(move){
      return !(moves.some(function(oldMove){
        return oldMove[0] === move[0] && oldMove[1] === move[1];
      }))
    })
    const move = possibleMoves[Math.floor(Math.random()* (possibleMoves.length))];

    if (this.state.playerBoard[move[0]][move[1]] !== '') {
      playerHealth -= 1;
      this.setState({
        playerHealth: playerHealth
      })
    }
    playerBoard[move[0]][move[1]] = playerBoard[move[0]][move[1]] + "f";
    moves.push(move);
    this.setState({
      playerBoard: playerBoard,
      computerMoves: moves
    })
  }

  placeComputerShips(){
    const board = [...this.state.computerBoard]
    const ships = this.state.playerShips;
    const shipNames = Object.keys(ships);
    let rows = [0,1,2,3,4,5,6,7,8,9]
    shipNames.map(function(ship){
      let row = rows[Math.floor(Math.random() * rows.length)]
      let index = rows.indexOf(row);
      rows.splice(index,1);
      let startCell = Math.floor(Math.random()* (11 - ships[ship].length))
      for (var i = 0; i < ships[ship].length; i++) {
        board[row][startCell + i] = ships[ship].symbol;
      }
    });
    this.setState({
      computerBoard: board
    })
  }

  start(){
    const newBoard = [
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '']
    ]

    const resetShips = {...this.state.playerShips};
    const shipNames = Object.keys(resetShips);
    shipNames.map(name => resetShips[name].isPlaced = false);
    this.setState({
      playerBoard: newBoard,
      computerBoard: newBoard,
      playerShips: resetShips,
      playerHealth: 17,
      computerHealth: 17,
    })
    this.placeComputerShips();
  }
  checkWin(){
    if (this.state.computerHealth === 0) {
      return("You Win!");
    } else if (this.state.playerHealth === 0) {
      return("You Lose!");
    }
  }
  render(){
    return(
      <div className="window">
        <h1 className="gameTitle">BATTLESHIP</h1>
        <div className="start">
          <button onClick={this.start}> Start a New Game! </button>
        </div>
        <Menu pickShip={this.pickShip}/>
        <h1 className="checkWin">{this.checkWin()}</h1>
        <div className="playersView">
          <div className="playerBoard">
            <h1>Your Board</h1>
            {this.state.playerBoard.map((row, index) => {
              return(
              <div onClick={this.placeShip} className="rows" key= {`playerBoard${index}`} data-row-id={index}>
                {row.map((cell, index)=> {
                  return(<div className="cells" key= {`playerBoard${index}`} data-cell-id={index}>{cell}</div>)
                })}
              </div>)
            })}
          </div>
          <div className="playerComputerBoard">
            <h1>Your Attacks</h1>
            {this.state.computerBoard.map((row, index) => {
              return(
              <div onClick={this.fire} className="rows" key= {`computerBoard${index}`} data-row-id={index}>
                {row.map((cell, index)=> {
                  return(<div className="cells" key= {`computerBoard${index}`} data-cell-id={index}></div>)
                })}
              </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Battleship;
