import React, { Component } from 'react';
import Menu from './Menu';
import ShipStatus from './ShipStatus';

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
    this.sideMenu = this.sideMenu.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.testPlacedShipsForHover = this.testPlacedShipsForHover.bind(this);
    this.state= {
      playerTurn: 0,
      selectedShip: {name: "aircraftCarrier", orientation: "h"},
      playerShips: {
        aircraftCarrier: { length: 5, symbol: 'A', isPlaced: false, hits: 0 },
        battleship: { length: 4, symbol: 'B', isPlaced: false, hits: 0 },
        submarine: { length: 3, symbol: 'S', isPlaced: false, hits: 0 },
        cruiser: { length: 3, symbol: 'C',isPlaced: false, hits: 0 },
        destroyer: { length: 2, symbol: 'D',isPlaced: false, hits: 0 }
      },
      computerShips: {
        aircraftCarrier: { length: 5, symbol: 'A', hits: 0 },
        battleship: { length: 4, symbol: 'B', hits: 0  },
        submarine: { length: 3, symbol: 'S', hits: 0 },
        cruiser: { length: 3, symbol: 'C', hits: 0 },
        destroyer: { length: 2, symbol: 'D', hits: 0 }
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
      if (rowIndex + length > 9) {
        return false
      } else {
        let testArea = []
        for (var i = 0; i < length-1; i++) {
          testArea.push(board[rowIndex + i][cellIndex])
        }
        return testArea.some(cell => cell !== "")
      }
    }
  }
  placeShip(e) {
    // finds the index of the cell clicked on and places the letter reprenseting the ship
    const cellIndex = parseInt(e.target.getAttribute("data-cell-id"), 10);
    const rowIndex = parseInt(e.currentTarget.getAttribute("data-row-id"), 10);
    const board = this.state.playerBoard.slice();
    const computerBoard = this.state.computerBoard.slice();
    const name = this.state.selectedShip.name;
    const orientation = this.state.selectedShip.orientation;
    const length = this.state.playerShips[name].length;
    const symbol = this.state.playerShips[name].symbol;
    const occupied = this.collidesWithShip(cellIndex, rowIndex, length, board, orientation)
    // its easier to make a copy of the playerShips (by spreading into ships)
    // change one ship in the object and then set state for the parent object
    const ships = {...this.state.playerShips};
    let selectedShip = {...this.state.selectedShip};

    if (this.state.playerShips[name].isPlaced === true) {
      alert("You have already placed this ship");
      return

    } else if( orientation === "h" ) {
      if (cellIndex + length > 10){
        alert(`There is not enough room on the board to place the ${name}.`);
        return
      } else if (occupied) {
        alert("You can not place a ship on top of another ship!");
        return
      } else {
        for (var i = 0; i < length; i++) {
          board[rowIndex][cellIndex + i] = symbol;
          //eslint-disable-next-line
          var cell = document.querySelector(`.playerBoard div[data-row-id=\"${rowIndex}\"] div[data-cell-id=\"${cellIndex + i}\"]`);
          cell.classList.add("placed-hoverImage");
          cell.classList.add(`placed-${selectedShip.name}-${i}`);
        }
      }

    } else if (orientation === "v") {
      if (rowIndex + length > 10) {
        alert(`There is not enough vertical space on the board to place the ${name}`);
        return
      } else if (occupied) {
        alert("You can not place a ship on top of another ship!");
        return
      } else {
        for (var j = 0; j < length; j++) {
          board[rowIndex + j][cellIndex] = symbol;
          //eslint-disable-next-line
          var cell = document.querySelector(`.playerBoard div[data-row-id=\"${rowIndex + j}\"] div[data-cell-id=\"${cellIndex}\"]`);
          cell.classList.add("placed-hoverImage");
          cell.classList.add(`placed-${selectedShip.name}-${j}`);
          cell.classList.add("placed-verticalImage");
        }
      }
    }

    ships[name].isPlaced = true

    this.setState({
      playerBoard: board,
      playerShips: ships
    })
    if (computerBoard.every(row => row.every(cell => cell === ""))) {
      this.placeComputerShips();
    }
  }

  allShipsPlaced(){
    const ships = {...this.state.playerShips};
    const names = Object.keys(this.state.playerShips);
    let arrayShips = names.map((name) => ships[name] );
    return arrayShips.every(ship => ship.isPlaced === true);
  }

  fire(e) {
    if (this.allShipsPlaced()){
      const row = e.currentTarget.getAttribute("data-row-id");
      const cell = e.target.getAttribute("data-cell-id");
      const board = this.state.computerBoard.slice();
      const ships = {...this.state.computerShips};
      const shipNames = Object.keys(ships);
      let computerHealth = this.state.computerHealth;
      if ((this.state.computerBoard[row][cell]).split("").some(char => char === "f")) {
        alert("You have already fired here.")
        return
      } else if(this.state.computerBoard[row][cell] === ''){
        e.target.classList.add('miss');
      } else {
        e.target.classList.add('hit');
        let shipName = shipNames.filter( ship => {
          return ships[ship].symbol === board[row][cell];
        });
        ships[shipName].hits += 1;
        computerHealth -= 1;
        this.setState({
          computerHealth: computerHealth,
          computerShips: ships
        })
      };
      board[row][cell] = board[row][cell] + "f";
      this.setState({
        computerBoard: board
      });
      this.computerFire();
    } else {
      alert("You must have placed all of your ships before firing.");
    }
  }

  computerFire() {
    const playerBoard = [...this.state.playerBoard];
    let playerHealth = this.state.playerHealth;
    let moves = [...this.state.computerMoves];
    const ships = {...this.state.playerShips};
    const shipNames = Object.keys(ships);
    const potentialMoves= [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]]
    // takes the array of potentialMoves and subtracts all moves already made (which are stored in state)
    let possibleMoves = potentialMoves.filter(function(move){
      return !(moves.some(function(oldMove){
        return oldMove[0] === move[0] && oldMove[1] === move[1];
      }))
    })

    const move = possibleMoves[Math.floor(Math.random()* (possibleMoves.length))];

    if (this.state.playerBoard[move[0]][move[1]] !== '') {
      //eslint-disable-next-line
      const target = document.querySelector(`.playerBoard div[data-row-id=\"${move[0]}\"] div[data-cell-id=\"${move[1]}\"]`);
      target.classList.add('hit');
      let shipName = shipNames.filter( ship => {
        return ships[ship].symbol === playerBoard[move[0]][move[1]];
      });
      ships[shipName].hits += 1;
      playerHealth -= 1;
      this.setState({
        playerShips: ships,
        playerHealth: playerHealth
      })
    } else {
      //eslint-disable-next-line
      const target = document.querySelector(`.playerBoard div[data-row-id=\"${move[0]}\"] div[data-cell-id=\"${move[1]}\"]`);
      target.classList.add('miss');
    }
    // playerBoard[move[0]][move[1]] = playerBoard[move[0]][move[1]] + "f";
    moves.push(move);
    this.setState({
      playerBoard: playerBoard,
      computerMoves: moves
    })
  }

  placeComputerShips(){
    const board = [...this.state.computerBoard];
    const ships = this.state.playerShips;
    const shipNames = Object.keys(ships);
    // let rows = [0,1,2,3,4,5,6,7,8,9]
    shipNames.map(function(ship){
      // 0 is horizontal and 1 is vertical
      let horizontalOrVertical = Math.floor(Math.random()*2);

      if (horizontalOrVertical === 0) {
        let row = Math.floor(Math.random() * 10);
        let startCell = Math.floor(Math.random()* (11 - ships[ship].length));

        while (this.collidesWithShip(startCell, row, ships[ship].length, board, "h")) {
          row = Math.floor(Math.random() * 10);
          startCell = Math.floor(Math.random() * (11 - ships[ship].length));
        }

        for (var i = 0; i < ships[ship].length; i++) {
          board[row][startCell + i] = ships[ship].symbol;
        }
      } else {

        let row = Math.floor(Math.random() * (11 - ships[ship].length));
        let startCell = Math.floor(Math.random() * 10);

        while (this.collidesWithShip(startCell, row, ships[ship].length, board, "v")) {
          row = Math.floor(Math.random()* (11 - ships[ship].length));
          startCell = Math.floor(Math.random() * 10);
        }

        for (var j = 0; j < ships[ship].length; j++) {
          board[row + j][startCell] = ships[ship].symbol;
        }

      }
    }, this);
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
    // player ships reset
    const resetShips = {...this.state.playerShips};
    const shipNames = Object.keys(resetShips);
    shipNames.map(name => resetShips[name].isPlaced = false);
    shipNames.map(name => resetShips[name].hits = 0);

    // computer ships resetShips
    const resetComputerShips = {...this.state.computerShips};
    const computerShipNames = Object.keys(resetComputerShips);
    computerShipNames.map(name => resetComputerShips[name].hits = 0);

    this.setState({
      playerBoard: newBoard,
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
      playerShips: resetShips,
      playerHealth: 17,
      computerHealth: 17,
    });
    // next 20 lines remove hit and miss classes from screen if needed when a new game is started.
    const missPlayerBoard = document.querySelectorAll('.playerBoard div.miss');
    const hitPlayerBoard = document.querySelectorAll('.playerBoard div.hit');
    const missComputerBoard = document.querySelectorAll('.playerComputerBoard div.miss');
    const hitComputerBoard = document.querySelectorAll('.playerComputerBoard div.hit');

    if (missPlayerBoard.length > 0) {
      missPlayerBoard.forEach( cell => cell.classList.remove('miss'));
    }

    if (hitPlayerBoard.length > 0) {
      hitPlayerBoard.forEach( cell => cell.classList.remove('hit'));
    }

    if (missComputerBoard.length > 0) {
      missComputerBoard.forEach( cell => cell.classList.remove('miss'));
    }

    if (hitComputerBoard.length > 0) {
      hitComputerBoard.forEach( cell => cell.classList.remove('hit'));
    }
    // removes placed boat images
    const boatClasses = [
      "placed-aircraftCarrier-0", "placed-aircraftCarrier-1", "placed-aircraftCarrier-2", "placed-aircraftCarrier-3", "placed-aircraftCarrier-4",
      "placed-battleship-0", "placed-battleship-1", "placed-battleship-2", "placed-battleship-3",
      "placed-cruiser-0", "placed-cruiser-1", "placed-cruiser-2",
      "placed-submarine-0", "placed-submarine-1", "placed-submarine-2",
      "placed-destroyer-0", "placed-destroyer-1",
      "placed-verticalImage", "placed-hoverImage"
    ]
    const list = Array.from(document.querySelectorAll(".placed-hoverImage"));
    boatClasses.map(function(boatClass){
      list.map(node => node.classList.remove(`${boatClass}`));
    });
  }

  checkWin(){
    if (this.state.computerHealth === 0) {
      return("You Win!");
    } else if (this.state.playerHealth === 0) {
      return("You Lose!");
    }
  }

  sideMenu(){
    let menu = document.querySelector(".menuComponents");
    if (Array.from(menu.classList).includes("collapsed")) {
      menu.classList.remove("collapsed");
    } else {
      menu.classList.add("collapsed");
    }
  }

  handleMouseEnter(e){
    let playerBoard = [...this.state.playerBoard];
    let selectedShip = {...this.state.selectedShip};
    let playerShips = {...this.state.playerShips};
    let length = playerShips[selectedShip.name].length
    let rowIndex = parseInt(e.target.parentNode.getAttribute("data-row-id"), 10);
    let cellIndex = parseInt(e.target.getAttribute("data-cell-id"), 10);

    if (selectedShip.orientation === "h" && cellIndex + length <= 10) {
      if (this.testPlacedShipsForHover(rowIndex, cellIndex, playerBoard, selectedShip.orientation) && !playerShips[selectedShip.name].isPlaced ) {
        e.target.classList.add("hoverImage");
        for (var i = 0; i < length ; i++) {
          //eslint-disable-next-line
          var cell = document.querySelector(`.playerBoard div[data-row-id=\"${rowIndex}\"] div[data-cell-id=\"${cellIndex + i}\"]`);
          cell.classList.add("hoverImage");
          cell.classList.add(`${selectedShip.name}-${i}`);
        }
      }
    } else if (selectedShip.orientation === "v" && rowIndex + length <= 10){
      if (this.testPlacedShipsForHover(rowIndex, cellIndex, playerBoard, selectedShip.orientation) && !playerShips[selectedShip.name].isPlaced ) {
        e.target.classList.add("hoverImage");
        for (var j = 0; j < length ; j++) {
          //eslint-disable-next-line
          var cell = document.querySelector(`.playerBoard div[data-row-id=\"${rowIndex + j}\"] div[data-cell-id=\"${cellIndex}\"]`);
          cell.classList.add("hoverImage");
          cell.classList.add(`${selectedShip.name}-${j}`);
          cell.classList.add("verticalImage");
          // multiple images aircraftCarrier-1
        }
      }
    }
  }

  testPlacedShipsForHover(rowIndex, cellIndex, playerBoard, orientation){
    let selectedShip = {...this.state.selectedShip};
    const playerShips = {...this.state.playerShips};
    let length = playerShips[selectedShip.name].length
    let placeable = true;

    if (orientation === "h") {
      for (var i = 0; i < length; i++) {
        if (playerBoard[rowIndex][cellIndex+i] !== "") {
          placeable = false;
        }
      }
    } else {
      for (var j = 0; j < length; j++) {
        if (playerBoard[rowIndex + j][cellIndex] !== "") {
          placeable = false;
        }
      }
    }
    return placeable;
  }

  handleMouseLeave(e){
    const boatClasses = [
      "aircraftCarrier-0", "aircraftCarrier-1", "aircraftCarrier-2", "aircraftCarrier-3", "aircraftCarrier-4",
      "battleship-0", "battleship-1", "battleship-2", "battleship-3",
      "cruiser-0", "cruiser-1", "cruiser-2",
      "submarine-0", "submarine-1", "submarine-2",
      "destroyer-0", "destroyer-1",
      "verticalImage", "hoverImage"
    ]
    const list = Array.from(document.querySelectorAll(".hoverImage"));
    boatClasses.map(function(boatClass){
      list.map(node => node.classList.remove(`${boatClass}`));
    });
  }

  render(){
    return(
      <div className="window">
        <h1 className="gameTitle">BATTLESHIP</h1>
        <h1 className="checkWin">{this.checkWin()}</h1>
        <div className="main">
          <div className="menuComponents collapsed">
            <button onClick={this.sideMenu} className="collapseButton">+</button>
            <div className="start">
              <button onClick={this.start}> Start a New Game! </button>
            </div>

            <div className="notMobile">
              <Menu pickShip={this.pickShip}/>
            </div>

            <ShipStatus playerShips={this.state.playerShips} computerShips={this.state.computerShips}/>
          </div>

          <div className="gameArea">

            <div className="playersView">
              <div className="mobile">
                <Menu pickShip={this.pickShip}/>
              </div>
              <div className="playerBoard">
                <h1>Your Board</h1>
                {this.state.playerBoard.map((row, index) => {
                  return(
                    <div onClick={this.placeShip} className="rows" key= {`playerBoard${index}`} data-row-id={index}>
                      {row.map((cell, index)=> {
                        return(<div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} className="cells" key= {`playerBoard${index}`} data-cell-id={index}></div>)
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
        </div>
      </div>
    );
  }
}
export default Battleship;
