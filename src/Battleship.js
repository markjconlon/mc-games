import React, { Component } from 'react';
import Menu from './Menu';

class Battleship extends Component {
  constructor() {
    super();
    this.fire = this.fire.bind(this);
    this.pickShip = this.pickShip.bind(this);
    this.state= {
      playerTurn: 0,
      selectedShip: {},
      playerShips: {
        // probably need to leave this open and add ships in as we go.
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
