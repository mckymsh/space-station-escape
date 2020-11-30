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

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom(){
    // this.contentEnd.scrollIntoView({ behavior: "smooth" });
  }

  append(newContent){
    var tempContent = this.state.mainContent;
    tempContent.push(newContent);
    this.setState({
      mainContent: tempContent,
    });
  }

  intro(){
    this.append( 
      <Col sm={{size: 'auto', order: 1, offset: 0}}>This is the intro.</Col>
    );
  }

  nextPart(){
    this.append(
      <Col sm={{size: 'auto', order: 1, offset: 8}}>This is the second part.</Col>
    );

  }

  

  // Some things adapted from
  // https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  render(){
    return (
      <div className="App">
        <Container className="Main-Content">
          {this.state.mainContent.map((item) => (
            <Row>{item}</Row>
            ))}
        </Container>
        <Container className="Actions fixed-bottom">
          <Row>
            <Col>
              <Button outline color="primary" onClick={() => this.intro()}>primary</Button>{' '}
            </Col>
            <Col>
              <Button outline color="secondary" onClick={() => this.nextPart()}>secondary</Button>{' '}
            </Col>
            <Col>
              <Button outline color="secondary" onClick={() => this.nextPart()}>secondary</Button>{' '}
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
