import React, { Component } from 'react';

class Battleship extends Component {;
  constructor(props) {
    super(props);
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
  render(){
    return(
      <div className="playersView">
        <div className="playerBoard">
          {this.state.playerBoard.map((cell, index) => {
            return <div className="cells" key= {`playerBoard${index}`} data-cell-id={index}>{cell}</div>;
          })}
        </div>
      </div>
    );
  }
}
export default Battleship;
