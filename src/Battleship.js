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
    const cellIndex = parseInt(e.target.getAttribute("data-cell-id"), 10);
    const rowIndex = parseInt(e.currentTarget.getAttribute("data-row-id"), 10);
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
      if (cellIndex + length > 10){
        console.log(cellIndex + length)
        alert("There is not enough room on the board for that ship.")
      } else {
        board[rowIndex][cellIndex] = symbol;

        for (var i = 1; i < length; i++) {
          board[rowIndex][cellIndex + i] = symbol;
        }

        ships[name].isPlaced = true

        this.setState({
          playerBoard: board,
          playerShips: ships
        })
      }
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
                    return(<div className="cells" key= {`computerBoard${index}`} data-cell-id={index}>{cell}</div>)
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
