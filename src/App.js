import React, { Component } from 'react';
import { Container, Row, Col,} from 'react-bootstrap';
import './App.css';

import { rooms, items, intro, } from './objectMaps.js';

const FADE_DURATION = 1500;
const TICK_TIME = 2000;

class App extends Component {

	constructor(props){
	    super(props);

	    this.state = {
		    inventory: null,

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

			var tempContent = this.state.mainContent;
			var tempContentQueue = this.state.contentQueue

			// Dump whole queue at once
			if(!this.state.animate){			
				tempContent = [].concat(tempContent, tempContentQueue);
				this.setState({
					mainContent: tempContent,
					contentQueue: [],
				});
			}
			// One item at a time
			else{		
				tempContent.push(tempContentQueue.shift());
				this.setState({
					mainContent: tempContent,
					contentQueue: tempContentQueue,
				});
			}
		}
	}

	componentDidUpdate() {
	    this.scrollToBottom();
	}

	reset(){
		let tempInventory = new Set();

	  	// https://stackoverflow.com/a/49687370/11937109
	    const roomKeys = Object.keys(rooms);
	    const randomIndex = Math.floor(Math.random() * roomKeys.length);
	    const randomKey = roomKeys[randomIndex];
	    
	    let tempVisited = new Set().add(rooms[randomKey]);	    

	    clearInterval(this.tickInterval);
	    this.tickInterval = setInterval(() => 
	    		this.tick(), TICK_TIME);

	    this.setState({
	    	inventory: tempInventory,

	    	currentRoom: randomKey,
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

	// addFade(content, fadeDelay){
	//     return(
	// 	    <Fade 
	// 	        triggerOnce={true} 
	// 	        cascade={true}
	// 	        duration={(this.state.animate)? FADE_DURATION : 0} 
	// 	        delay={SCROLL_FADE_DELAY}
	// 	    >{content}</Fade>
	//     );
	// }

	intro(){
	  	// this.reset();

	    let newContent = [];

	    for(var i = 0; i < intro.length; i++){
	    	newContent.push(
		        <Row>
			        <Col className={"content-piece "+(this.state.animate?"item-fadein ":" ")+"text-"+intro[i].alignment}>
				        {intro[i].text}
			        </Col>
		        </Row>
		    );
	    }
	    
	    this.setState({
		    contentQueue: newContent,
	    }, this.prompt);
	}

	pickupItem(itemKey){
		// window.alert("pickupItem("+itemKey+")");
		// window.alert("desc: "+items[itemKey].desc);
		// window.alert("pickup: "+items[itemKey].pickup);

		// add item to inventory & remove from room
		let tempCurrentRoom = this.state.currentRoom;
		let tempInventory = this.state.inventory;

		const index = rooms[tempCurrentRoom].items.indexOf(itemKey);
		rooms[tempCurrentRoom].items.splice(index, 1);

		tempInventory.add(itemKey);

    	let tempContentQueue = this.state.contentQueue;
		tempContentQueue.push(
		      <Row>
		        <Col className={"content-piece text-left "+this.state.animate?"item-fadein":""}>
			        You look closer at {items[itemKey].name}. {items[itemKey].desc}
		        </Col>
		      </Row>
		);
		tempContentQueue.push(
		      <Row>
		        <Col className={"content-piece text-left "+this.state.animate?"item-fadein":""}>
			        {items[itemKey].pickup}
		        </Col>
		      </Row>
		);

		this.setState({
			inventory: tempInventory,

			contentQueue: tempContentQueue,
		}, this.prompt);
	}

	changeRoom(newRoom){
	    if(!(newRoom in rooms)){
		    return;
	    }

	    // Remove navigation when clicked
	    let tempContent = this.state.mainContent;
	    tempContent = tempContent.slice(0, tempContent.length-1);

	    // Room exit text-- eventually different for each room?
	    let tempContentQueue = this.state.contentQueue;
	    tempContentQueue.push(
		      <Row>
		        <Col className={"content-piece text-center "+this.state.animate?"item-fadein":""}>
			        You leave {rooms[this.state.currentRoom].name} and enter {rooms[newRoom].name}.
		        </Col>
		      </Row>
    	)

	    this.setState({
		    currentRoom: newRoom,

		    contentQueue: tempContentQueue,
		    mainContent: tempContent,
	    }, this.prompt);
	}

	prompt(){
	    var tempContentQueue = this.state.contentQueue;
	    var tempCurrentRoom = this.state.currentRoom;
	    var tempVisited = this.state.roomsVisited;

	    // If this is the first time we've been here, 
	    //     display room description.
	    if (!tempVisited.has(tempCurrentRoom)){
	    	tempVisited = tempVisited.add(tempCurrentRoom);
		    tempContentQueue.push(
					<Row>
						<Col className={"content-piece text-left "+this.state.animate?"item-fadein":""}>
							{rooms[tempCurrentRoom].desc}
						</Col>
					</Row>
		    );
	    }else{
	    	tempContentQueue.push(
			      <Row>
			        <Col className={"content-piece text-left "+this.state.animate?"item-fadein":""}>
			          You are in {rooms[tempCurrentRoom].name}
			         </Col>
			      </Row>
		    );
	    }	    

	    // list objects visible
	    let tempItems = rooms[tempCurrentRoom].items;

	    if(tempItems && tempItems.length > 0){
	    	// window.alert("tempItems exists and is "+tempItems.length+" items long.");
	    	tempContentQueue.push(
					<Row>
						<Col className={"content-piece text-left "+this.state.animate?"item-fadein":""}>Scanning the room, you see&nbsp;
							{Object.values(tempItems.slice(0, tempItems.length-1)).map((itemKey) => (
								<span>
									{this.appLink(
											items[itemKey].name,
											() => this.pickupItem(itemKey)
										)
									} {items[itemKey].location},&nbsp; 
								</span>
							))}
							{Object.values(tempItems.slice(tempItems.length-1, 
															tempItems.length)).map((itemKey) => (
								<span>
									{this.appLink(
											items[itemKey].name,
											() => this.pickupItem(itemKey)
										)
									} {items[itemKey].location}.&nbsp; 
								</span>
							))}
						</Col>
					</Row>
			);
		}

	    // list movement options
	    let tempNeighbors = rooms[tempCurrentRoom].neighbors;

	    tempContentQueue.push(
	        <Row>
		        <Col className={"content-piece text-left "+this.state.animate?"item-fadein":""}>You can move&nbsp;
		            {Object.values(tempNeighbors.slice(0, tempNeighbors.length-1)).map((neighbor) => (
			            <span>
			                {neighbor.direction} to {this.appLink(
									            	rooms[neighbor.key].name,
								                	() => this.changeRoom(neighbor.key))
									            },&nbsp; 
			            </span>
		            ))}
		            {Object.values(tempNeighbors.slice(tempNeighbors.length-1, 
										            	tempNeighbors.length)).map((neighbor) => (
			            <span>
			                or {neighbor.direction} to {this.appLink(
									            	rooms[neighbor.key].name,
								                	() => this.changeRoom(neighbor.key))
									            }.&nbsp; 
			            </span>
		            ))}
		        </Col>
	        </Row>
	    );

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
	        <Container className="Actions fixed-bottom text-center">
		        |&nbsp;{this.appLink("reset", () => this.reset())}&nbsp;|&nbsp;
			        {this.appLink(("anim.")+(this.state.animate ? " on" : " off"),
									         () => this.toggleAnimation())}&nbsp;|
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
