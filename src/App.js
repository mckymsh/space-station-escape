import React, { Component } from 'react';
import { Container, Row, Col,} from 'react-bootstrap';
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
  	// https://stackoverflow.com/a/49687370/11937109
    const roomKeys = Object.keys(rooms);
    const randomIndex = Math.floor(Math.random() * roomKeys.length);
    const randomKey = roomKeys[randomIndex];
    // window.alert(randomKey);
    let tempcurrentRoomKey = randomKey;
    // window.alert(tempcurrentRoomKey.name);
    let tempVisited = new Set().add(rooms[tempcurrentRoomKey]);

    this.setState({
    	inventory: [],

    	currentRoom: tempcurrentRoomKey,
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

    this.setState({
      currentRoom: newRoom,
    }, this.roomWelcome);
  }

  roomWelcome(){
    let tempContent = this.state.mainContent;
    var tempCurrentRoom = this.state.currentRoom;

    var tempVisited = this.state.roomsVisited;

    // window.alert(tempCurrentRoom);

    tempContent.push(
	    this.addFade(
	      <Row>
	        <Col className="content-piece text-left">
	          You are in {this.appLink(rooms[tempCurrentRoom].name ,() => this.showDesc("room", tempCurrentRoom))}
	         </Col>
	      </Row>
	        , 0
	    )
    );

    // If this is the first time we've been here, 
    //     display room description.
    if (!tempVisited.has(tempCurrentRoom)){
    	tempVisited = tempVisited.add(tempCurrentRoom);
	    tempContent.push(
		    this.addFade(
		      <Row>
		        <Col className="content-piece text-center">
		          {rooms[tempCurrentRoom].desc}
		         </Col>
		      </Row>
		        , DELAY_TIME
		    )
	    );
    }

    let tempNeighbors = rooms[tempCurrentRoom].neighbors;

    // tempNeighbors.forEach((item)=>{
    // 	window.alert(item.key);
    // });

    // list movement options
    tempContent.push(
      this.addFade(
        <Row>
          <Col className="content-piece text-left">You can move&nbsp;
            {Object.values(tempNeighbors.slice(0, tempNeighbors.length-1)).map((neighbor) => (
              <span>
                {neighbor.direction} to {this.appLink(
							            	rooms[neighbor.key].name,
						                	() => this.changeRoom(neighbor.key))
							            },&nbsp; 
              </span>
            ))}
            {Object.values(tempNeighbors.slice(tempNeighbors.length-1, tempNeighbors.length)).map((neighbor) => (
              <span>
                or {neighbor.direction} to {this.appLink(
							            	rooms[neighbor.key].name,
						                	() => this.changeRoom(neighbor.key))
							            }.&nbsp; 
              </span>
            ))}
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
	        |&nbsp;{this.appLink("reset", () => this.intro())}&nbsp;|&nbsp;
		        {this.appLink(("anim.")+(this.state.animate ? " on" : " off"), () => this.toggleAnimation())}&nbsp;|
        </Container>
      </div>
    );
	}

	appLink(text, clickFunction){
	    return(
	      <span 
	        href="./#" 
	        className="App-link"
	        onClick={clickFunction}
	      >{text}</span>
	    );
	  }
}

export default App;
