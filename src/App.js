import React, { Component } from 'react';
import { Container, Row, Col, Button,} from 'react-bootstrap';
import { Fade } from 'react-awesome-reveal';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      inventory: [],
      roomsVisited: [],
      currentRoom: "Engineering",
      mainContent: [],
      open: true,
    }

    this.rooms = [
      "Storage",
      "Engineering",
      "Airlock",
      "Lab",
      "Hydroponics",
      "ShuttleBay",
    ];

    this.FADE_DURATION = 2000;
    this.FADE_DELAY = 200;
  }

  componentDidMount(){
    this.intro();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  // Adapted from
  // https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react#41700815
  scrollToBottom(){
    this.contentEnd.scrollIntoView({ behavior: "smooth" });
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
      <Col className="content-piece text-left" sm={{span: "auto", offset: 1}}>
      This is the intro.<br/>
        It has a link to the <a 
            href="./#" 
            className="App-link"
            onClick={() => this.nextPart()}
          >second part</a>.
       </Col>
    );
  }

  nextPart(){
    this.append(
      <Col className="content-piece text-right" sm={{span: "auto", order: "last", offset: 6}}>
        This is the second part.<br/>
        It has a link to the <a 
            href="./#" 
            className="App-link"
            onClick={() => this.otherPart()}
          >third part</a>.
      </Col>
    );
  }

  otherPart(){
    this.append(
      <Col className="content-piece text-center" xs={{span: "auto", offset: 4}}>This is the third part.</Col>
    );
  }  

  render(){
    return (
      <div className="App">
        <Container className="Main-Content">
          <Fade 
            triggerOnce={true} 
            duration={this.FADE_DURATION} 
            delay={this.FADE_DELAY}
          >
            {
              this.state.mainContent.map((item) => (
                <Row>{item}</Row> 
              ))
            }
          </Fade>
          <Row>
            <Col>
              <div 
                className="contentEnd-filler" 
                ref={(el) => { this.contentEnd = el; }}>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="Actions fixed-bottom">
          <Row>
            <Col>
              <Button variant="outline-primary" 
                onClick={() => this.intro()}>primary</Button>{' '}
            </Col>
            <Col>
              <Button variant="outline-primary" 
                onClick={() => this.nextPart()}>secondary</Button>{' '}
            </Col>
            <Col>
              <Button variant="outline-primary" 
                onClick={() => this.otherPart()}>secondary</Button>{' '}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
