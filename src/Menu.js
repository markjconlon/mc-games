import React, {Component} from 'react';

class Menu extends Component{
  selectShip(event) {
    event.preventDefault();
    this.props.pickShip(this.name.value, this.orientation.value);
  }
  render(){
    return(
      <div className= "menu">
        <h1>Battleship</h1>
        <form onChange={(e)=> this.selectShip(e)}>
          <select ref={(input) => this.name = input } placeholder="Ship Name">
            <option value= "aircraftCarrier">Aircraft Carrier</option>
            <option value="battleship">Battleship</option>
            <option value="submarine">Submarine</option>
            <option value="cruiser">Cruiser</option>
            <option value="destroyer">Destroyer</option>
          </select>
          <select ref={(input) => this.orientation = input } placeholder="Orientation">
            <option value="h">Horizontal</option>
            <option value="v">Vertical</option>
          </select>
        </form>
      </div>
    )
  }
}
export default Menu;
