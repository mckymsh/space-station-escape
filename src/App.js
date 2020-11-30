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

    this.nextPart = this.nextPart.bind(this);
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
      <Col sm={{size: 4, order: 1, offset: 0}}>This is the intro.</Col>
    );
  }

  nextPart(){
    this.append(
      <Col sm={{size: 4, order: 1, offset: 7}}>This is the second part.</Col>
    );
    setTimeout(
      this.append(
        <Col sm={{size: 4, order: 1, offset: 3}}>This is the third part.</Col>
      ), 5000
    );
  }

  

  // Some things adapted from
  // https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  render(){
    return (
      <div className="App">
        <Container className="Main-Content">
          {
            this.state.mainContent.slice(0, 
                      this.state.mainContent.length-1).map(
                        (item) => ( <Row>{item}</Row> )
                      )
            }
          {
            <Row>
              {this.state.mainContent[this.state.mainContent.length-1]}
            </Row>
          }
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
