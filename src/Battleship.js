import React, { Component } from 'react';

class Battleship extends Component {;
  constructor(props) {
    super(props);
    this.fire = this.fire.bind(this);
    this.state= {
      playerTurn: 0,
      playerShips: {
        aircraftCarrier: { length: 5, symbol: 'L' },
        battleship: { length: 4, symbol: 'M' },
        submarine: { length: 3, symbol: 'N' },
        cruiser: { length: 3, symbol: 'O' },
        destroyer: { length: 2, symbol: 'P' }
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

  fire(e) {
    if (this.state.computerBoard[e.target.getAttribute("data-cell-id")] === '') {
      e.target.classList.add('miss');
    } else {
      e.target.classList.add('hit');
    };
  }
  render(){
    return(
      <div className="playersView">
        <div className="playerBoard">
          <h1>Your Board</h1>
          {this.state.playerBoard.map((cell, index) => {
            return <div className="cells" key= {`playerBoard${index}`} data-cell-id={index}>{cell}</div>;
          })}
        </div>
        <div className="playerComputerBoard">
          <h1>Your Attacks</h1>
          {this.state.computerBoard.map((cell, index) => {
            return <div onClick={this.fire} className="cells" key= {`computerBoard${index}`} data-cell-id={index}></div>;
          })}
        </div>
      </div>
    );
  }
}
export default Battleship;
