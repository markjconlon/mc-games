import React, { Component } from 'react';
import Menu from './Menu';

class Battleship extends Component {
  constructor() {
    super();
    this.fire = this.fire.bind(this);
    this.pickShip = this.pickShip.bind(this);
    this.placeShip = this.placeShip.bind(this);
    this.state= {
      playerTurn: 0,
      selectedShip: {},
      playerShips: {
        aircraftCarrier: { length: 5, symbol: 'L', isPlaced: false },
        battleship: { length: 4, symbol: 'M', isPlaced: false },
        submarine: { length: 3, symbol: 'N', isPlaced: false },
        cruiser: { length: 3, symbol: 'O',isPlaced: false },
        destroyer: { length: 2, symbol: 'P',isPlaced: false }
      },
      playerBoard: [
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', ''
      ],
      computerBoard: [
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', ''
      ]
    }
  }

  pickShip(name) {
    const newShip = this.state.playerShips[name]
    console.log(newShip);
    this.setState({
      selectedShip: {name: name, orientation: "h" }
    })
  }

  placeShip(e) {
    // finds the index of the cell clicked on and places the letter reprenseting the ship
    const cellIndex = e.target.getAttribute("data-cell-id");
    const board = this.state.playerBoard.slice();
    const name = this.state.selectedShip.name
    const length = this.state.playerShips[name].length;
    const symbol = this.state.playerShips[name].symbol;
    // its easier to make a copy of the playerShips (by spreading into ships)
    // change one ship in the object and then set state for the parent object
    const ships = {...this.state.playerShips}

    if (this.state.playerShips[name].isPlaced === true) {
      alert("You have already placed this ship");
      return
    } else {
      board[cellIndex] = symbol;

      for (var i = 1; i < length; i++) {
        board[parseInt(cellIndex, 10) + i] = symbol;
      }

      ships[name].isPlaced = true

      this.setState({
        playerBoard: board,
        playerShips: ships
      })
    }
  }

  fire(e) {
    if (this.state.computerBoard[e.target.getAttribute("data-cell-id")] === '') {
      e.target.classList.add('miss');
    } else {
      e.target.classList.add('hit');
    };
  }

  render(){
    return(
      <div className="window">
        <Menu pickShip={this.pickShip}/>
        <div className="playersView">
          <div className="playerBoard">
            <h1>Your Board</h1>
            {this.state.playerBoard.map((cell, index) => {
              return <div onClick={this.placeShip} className="cells" key= {`playerBoard${index}`} data-cell-id={index}>{cell}</div>;
            })}
          </div>
          <div className="playerComputerBoard">
            <h1>Your Attacks</h1>
            {this.state.computerBoard.map((cell, index) => {
              return <div onClick={this.fire} className="cells" key= {`computerBoard${index}`} data-cell-id={index}></div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Battleship;
