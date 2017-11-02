import React, {Component} from 'react';

class Menu extends Component{
  constructor(props){
    super();
  }
  render(){
    return(
      <div>
        Choose a ship to place:
        <select id="ship">
          <option value="" selected>Choose One</option>
          <option value={this.props.ships.aircraftCarrier}>Aircraft Carrier</option>
          <option value={this.props.ships.battleship}>Battleship</option>
          <option value={this.props.ships.submarine}>Submarine</option>
          <option value={this.props.ships.cruiser}>Cruiser</option>
          <option value={this.props.ships.destroyer}>Destroyer</option>
        </select>
        <select id="orientation">
          <option value="" selected>Choose One</option>
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
        </select>
      </div>
    )
  }
}
export default Menu;
