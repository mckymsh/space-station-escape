import React, {Component} from 'react';
import { Container, Row, Col, Button,} from 'react-bootstrap';
import { Fade } from 'react-awesome-reveal';
import './App.css';

// import {Container, Row, Col, Button} from 'reactstrap';

class App extends Component {

  rooms = [
    "Storage",
    "Engineering",
    "Airlock",
    "Lab",
    "Hydroponics",
    "ShuttleBay",
  ];

  constructor(props){
    super(props);

    this.state={
      inventory: [],
      roomsVisited: [],
      currentRoom: "Engineering",
      mainContent: [],
      open: true,
    }
  }

  componentDidMount(){
    this.intro();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom(){
    this.contentEnd.scrollIntoView({ behavior: "smooth" });
  }

  append(newContent){
    var tempContent = this.state.mainContent;
    tempContent.push(newContent);
    this.setState({
      mainContent: tempContent,
    });
    // setTimeout(this.setState({open: false,}), 1000);
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

  // Some things adapted from
  // https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react#41700815
  render(){
    return (
      <div className="App">
        <Container className="Main-Content">
          <Fade triggerOnce={true} duration={3000} delay={200}>
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
