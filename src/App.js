import React, { Component } from 'react';
import { Container, Row, Col, Button,} from 'react-bootstrap';
import { Fade } from 'react-awesome-reveal';
import './App.css';

import rooms from './objectMaps.js';

const SCROLL_FADE_DELAY = 200;
const FADE_DURATION = 2000;
const DELAY_TIME = FADE_DURATION/2;




class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      inventory: [],

      currentRoom: null,
      roomsVisited: null,
      
      mainContent: [],
      animate: true,
    }

    this.reset();
  }

  componentDidMount(){
    this.intro();    
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  reset(){
  	let tempCurrentRoom = "southHub";
    let tempVisited = new Set().add(tempCurrentRoom);

    this.setState({
    	inventory: [],

    	currentRoom: tempCurrentRoom,
    	roomsVisited: tempVisited,

    	mainContent: [],
    });
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
        cascade={true}
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
  	this.reset();

    let newContent = [];

    newContent.push(
      this.addFade(
        <Row>
          <Col className="content-piece text-center">
            This is the intro.
           </Col>
        </Row>
      , 0
    ));
    
    this.setState({
      mainContent: newContent,
    }, this.roomWelcome);
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
    if(!(newRoom in rooms)){
      return;
    }

    let tempVisited = this.state.roomsVisited;
    tempVisited.add(newRoom);

    this.setState({
      roomsVisited: tempVisited,
      currentRoom: newRoom,
    }, this.roomWelcome);
  }

  roomWelcome(){
    let tempContent = this.state.mainContent;
    let tempCurrentRoom = this.state.currentRoom;

    tempContent.push(
	    this.addFade(
	      <Row>
	        <Col className="content-piece text-left">
	          You are in <span 
	            className="App-link"
	            onClick={() => this.showDesc("room", tempCurrentRoom)}
	          >{rooms[this.state.currentRoom].name}</span>.
	         </Col>
	      </Row>
	        , 0
	    )
    );
    tempContent.push(
	    this.addFade(
	      <Row>
	        <Col className="content-piece text-center">
	          {rooms[this.state.currentRoom].desc}
	         </Col>
	      </Row>
	        , DELAY_TIME
	    )
    );

    let tempNeighbors = rooms[this.state.currentRoom].neighbors;

    // tempNeighbors.forEach((item)=>{
    // 	window.alert(item.key);
    // });

    tempContent.push(
      this.addFade(
        <Row>
          <Col className="content-piece text-left">
            <ul>
            {Object.values(tempNeighbors).map((neighbor) => (
              <li>
                You can move {neighbor.direction} to <span className="App-link"
                  onClick={() => this.changeRoom(neighbor.key)}
                >{rooms[neighbor.key].name}</span>.
              </li>
            ))}
            </ul>
           </Col>
        </Row>
        , 2*DELAY_TIME
      )
    );

    this.setState({
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
      </Row>, SCROLL_FADE_DELAY
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
        </Row>, SCROLL_FADE_DELAY+(FADE_DURATION/2.5)
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
