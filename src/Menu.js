import React, {Component} from 'react';

class Menu extends Component{
  selectShip(event) {
    event.preventDefault();
    this.props.pickShip(this.name.value);
  }
  render(){
    return(
      <div>
        Choose a ship to place:
        <form onSubmit={(e)=> this.selectShip(e)}>
          <select ref={(input) => this.name = input } placeholder="Ship Name">
            <option value= "aircraftCarrier">Aircraft Carrier</option>
            <option value="battleship">Battleship</option>
            <option value="submarine">Submarine</option>
            <option value="cruiser">Cruiser</option>
            <option value="destroyer">Destroyer</option>
          </select>
          <select ref={(input) => this.orientation = input } placeholder="Orientation">
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
          <button type="submit">Add Ship</button>
        </form>
      </div>
    )
  }
}
export default Menu;