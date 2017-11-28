import React, { Component } from 'react';

class ShipStatus extends Component{
  constructor(){
    super();
    this.formattedShips = this.formattedShips.bind(this);
  }

  formattedShips(passedShips){
    const ships = passedShips
    const shipNames = Object.keys(this.props.playerShips)

    const formatted = shipNames.map( (ship, index) => {
      if (ships[ship].length - ships[ship].hits === 0){
        return <li className="sunk" key={index}>{ship.toUpperCase()}</li>
      } else {
        return <li className="afloat" key={index}>{ship.toUpperCase()}</li>
      }
    });
    return formatted
  }
  render(){
    return(
      <div className="shipStatus">

        <ul>
          {this.formattedShips(this.props.playerShips)}
        </ul>
        <ul>
          {this.formattedShips(this.props.computerShips)}
        </ul>

      </div>
    )
  }
}

export default ShipStatus;
