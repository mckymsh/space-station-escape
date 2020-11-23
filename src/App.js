import React, {Component} from 'react';
import './App.css';

import {Container, Row, Col, Button} from 'reactstrap';

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
      mainContent: [],
    }

  }

  componentDidMount(){
    // this.intro();
  }

  append(newContent){
    var tempContent = this.state.mainContent;
    tempContent.push(newContent);
    this.setState({
      mainContent: tempContent,
    });
  }

  intro(){
    this.append(this.columnGenerator("This is the intro."));
  }

  nextPart(){
    this.append(this.columnGenerator("This is the next part."));
  }

  columnGenerator(text){
    return(
      <Col>{text}</Col>
    )
  }

  render(){
    return (
      <div className="App">
        <Container>
          {this.state.mainContent}
        </Container>
        <Container className="Actions fixed-bottom m-5">
          <Row>
            <Col>
              <Button outline color="primary" onClick={() => this.intro()}>primary</Button>{' '}
            </Col>
            <Col>
              <Button outline color="secondary" onClick={() => this.nextPart()}>secondary</Button>{' '}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
