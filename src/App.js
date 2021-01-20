import React, { Component } from 'react';
import { Container, Row, Col,} from 'react-bootstrap';
import { Fade } from 'react-awesome-reveal';
import './App.css';

import { rooms, intro } from './objectMaps.js';

const SCROLL_FADE_DELAY = 200;
const DELAY_TIME = 2000;

class App extends Component {

	constructor(props){
	    super(props);

	    this.state = {
		    inventory: [],

		    currentRoom: null,
		    roomsVisited: null,

		    contentQueue: [],
		    mainContent: [],

		    animate: true,
	    }
	}

	componentDidMount(){
	    this.reset();
	}

	tick(){
		// window.alert("tick"); // this is maddening but also helpful?
		if(this.state.contentQueue.length > 0){
			let tempContent = this.state.mainContent;
			let tempContentQueue = this.state.contentQueue
			tempContent.push(tempContentQueue.shift());
			this.setState({
				mainContent: tempContent,
				contentQueue: tempContentQueue,
			});
		}
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

	    this.tickInterval = setInterval(() => 
	    		this.tick(), 1000);

	    this.setState({
	    	inventory: [],

	    	currentRoom: tempcurrentRoomKey,
	    	roomsVisited: tempVisited,

	    	contentQueue: [],

	    	mainContent: [],
	    }, this.intro);
	}

	// Adapted from
	// https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react#41700815
	scrollToBottom(){
	    // if(this.state.animate){
	    	this.contentEnd.scrollIntoView({
	    		behavior: "smooth", 
	    		block: "start"
	    	});
	    // }
	}

	addFade(content, fadeTime){
	    return(
		    <Fade 
		        triggerOnce={true} 
		        cascade={true}
		        duration={(this.state.animate)? fadeTime : 0} 
		        delay={SCROLL_FADE_DELAY}
		    >{content}</Fade>
	    );
	}

	intro(){
	  	// this.reset();

	    let newContent = [];

	    for(var i = 0; i < intro.length; i++){
	    	newContent.push(
			    this.addFade(
			        <Row>
				        <Col className={"content-piece text-"+intro[i].alignment}>
					        {intro[i].text}
				        </Col>
			        </Row>
			    , intro[i].time
		    ));
	    }
	    
	    this.setState({
		    contentQueue: newContent,
	    }, this.roomWelcome);
	}

	changeRoom(newRoom){
	    if(!(newRoom in rooms)){
		    return;
	    }

	    // Remove navigation when clicked
	    let tempContent = this.state.mainContent;
	    tempContent = tempContent.slice(0, tempContent.length-1);

	    // Room exit text
	    let tempContentQueue = this.state.contentQueue;
	    tempContentQueue.push(
	    	this.addFade(
		      <Row>
		        <Col className="content-piece text-center">
			        You leave {rooms[this.state.currentRoom].name} and enter {rooms[newRoom].name}.
		        </Col>
		      </Row>
		        , 0
		    )
    	)

	    this.setState({
		    currentRoom: newRoom,
		    mainContent: tempContent,
	    }, this.roomWelcome);
	}

	roomWelcome(){
	    var tempContentQueue = this.state.contentQueue;
	    var tempCurrentRoom = this.state.currentRoom;
	    var tempVisited = this.state.roomsVisited;

	    // window.alert("roomWelcome: "+tempCurrentRoom);

	    tempContentQueue.push(
		    this.addFade(
		      <Row>
		        <Col className="content-piece text-left">
		          You are in {rooms[tempCurrentRoom].name}
		         </Col>
		      </Row>
		        , 0
		    )
	    );

	    var extraDelay = false;
	    // If this is the first time we've been here, 
	    //     display room description.
	    if (!tempVisited.has(tempCurrentRoom)){
	    	extraDelay = true;
	    	tempVisited = tempVisited.add(tempCurrentRoom);
		    tempContentQueue.push(
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

	    // list movement options
	    tempContentQueue.push(
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
	        , ((extraDelay) ? 2*DELAY_TIME : DELAY_TIME)
	    ));

	    this.setState({
		    contentQueue: tempContentQueue,
	    });
	}

	toggleAnimation(){
	    this.setState(prevState => ({
		    animate: !prevState.animate,
	    }));
	}

	render(){
	    return(
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
		        |&nbsp;{this.appLink("reset", () => this.reset())}&nbsp;|&nbsp;
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
