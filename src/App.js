import React, { Component } from 'react';
import { Container, Row, Col, Button,} from 'react-bootstrap';
import { Fade } from 'react-awesome-reveal';
import './App.css';

import rooms from './objectMaps.js';

const SCROLL_FADE_DELAY = 200;
const FADE_DURATION = 2000;




class App extends Component {

  constructor(props){
    super(props);

    let tempCurrentRoom = "southHub";
    let tempVisited = new Set().add(tempCurrentRoom);

    this.state = {
      inventory: [],

      currentRoom: tempCurrentRoom,
      roomsVisited: tempVisited,
      
      mainContent: [],
      animate: true,
    }
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
    this.contentEnd.scrollIntoView({behavior: "smooth", block: "start"});
  }

  append(newContent){
    var tempContent = this.state.mainContent;
    tempContent.push(newContent);
    this.setState({
      mainContent: tempContent,
    });
  }

  addFade(content, fadeDelay){
    return(
      <Fade 
        triggerOnce={true} 
        duration={(this.state.animate)? FADE_DURATION : 0} 
        delay={(this.state.animate)? fadeDelay + SCROLL_FADE_DELAY : 0}
      >{content}</Fade>
    );
  }

  createLink(text, clickFunction){
    return(
      <span 
        href="./#" 
        className="App-link"
        onClick={clickFunction}
      >{text}</span>
    );
  }

  intro(){
    let newContent = [];
    newContent.push(
      this.addFade(
        <Row>
          <Col className="content-piece text-center">
            This is the intro.
           </Col>
        </Row>
      , 200
    ));
    newContent.push(
      this.addFade(
        <Row>
          <Col className="content-piece text-left">
            You are in <span 
              className="App-link"
              onClick={() => this.showDesc("room", this.state.currentRoom)}
            >{rooms[this.state.currentRoom].name}</span>.
           </Col>
        </Row>
        , FADE_DURATION/2
      )
    );
    this.append(newContent);
  }

  showDesc(itemType, itemName){
    if(itemType === "room")
    {
      this.append(
        this.addFade(
          <Row>
            <Col className="content-piece text-center">
              {rooms[itemName].desc}
            </Col>
          </Row>
       , 0
      ));
    }
  }

  changeRoom(newRoom){
    if(rooms[newRoom] === null){
      return;
    }

    let tempVisited = this.state.roomsVisited;
    tempVisited.add(newRoom);

    let tempContent = this.state.mainContent;
    tempContent.push(
      this.addFade(
        <Row>
          <Col className="content-piece text-left">
            You are in <span 
              className="App-link"
              onClick={() => this.showDesc("room", this.state.currentRoom)}
            >{rooms[this.state.currentRoom].name}</span>.
           </Col>
        </Row>
        , 0
      )
    );

    this.setState({
      roomsVisited: tempVisited,
      currentRoom: newRoom,

      mainContent: tempContent,
    });
  }

  nextPart(){
    let newContent = []
    newContent.push(
      this.addFade(
      <Row>
        <Col className="content-piece text-center">
          This is the second part.
        </Col>
      </Row>, 0
    ));
    newContent.push(
      this.addFade(
        <Row>
          <Col className="content-piece text-left">
            It has a link to the <span 
              className="App-link"
              onClick={() => this.otherPart()}
            >third part</span>.
          </Col>
        </Row>, FADE_DURATION/2.5
    ));
    this.append(newContent);
  }

  otherPart(){
    this.append(
      this.addFade(
      <Row>
        <Col className="content-piece text-center">This is the third part.</Col>
      </Row>, 0
    ));
  }  

  toggleAnimation(){
    let tempBool = this.state.animate;
    this.setState({
      animate: !tempBool,
    });
  }

  render(){
    return (
      <div className="App">
        <Container className="Main-Content">
            {this.state.mainContent.map((item) => (item))}
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
              <Button type="checkbox" variant="outline-primary"
                onClick={() => this.toggleAnimation()}>animation {this.state.animate ? "on" : "off"}</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
