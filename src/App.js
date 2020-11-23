import React, {Component} from 'react';
import './App.css';

import {Container} from 'reactstrap';

class App extends Component {

  rooms = [
    "Storage",
    "Engineering",
    "Airlock",
    "Lab",
    "Hydroponics",
    "ShuttleBay"
  ];

  constructor(props){
    super(props);

    this.state={
      inventory: [],
      roomsVisited: [],
      currentRoom: "Engineering",
    }

  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <p>This is a paragraph.</p>        
        </header>
        <Container>
          
        </Container>
      </div>
    );
  }
}

export default App;
