import React, { Component } from 'react';
import { Container, Row, Col,} from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import './App.css';

import { defaultRooms, defaultItems, intro, } from './objectMaps.js';

// const FADE_DURATION = 1500;
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

		// https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089

		this.rooms = cloneDeep(defaultRooms);
		this.items = cloneDeep(defaultItems);

	  	// https://stackoverflow.com/a/49687370/11937109
	    const roomKeys = Object.keys(this.rooms);
	    const randomIndex = Math.floor(Math.random() * roomKeys.length);
	    const randomKey = roomKeys[randomIndex];
	    
	    let tempVisited = new Set().add(this.rooms[randomKey]);	    

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

	intro(){

	    let newContent = [];

	    for(var i = 0; i < intro.length; i++){
	    	newContent.push(
		        <Row>
			        {this.contentPiece(intro[i].text, intro[i].alignment)}
		        </Row>
		    );
	    }
	    
	    this.setState({
		    contentQueue: newContent,
	    }, this.prompt);
	}

	pickupItem(itemKey){

		// add item to inventory & remove from room
		let tempCurrentRoom = this.state.currentRoom;
		let tempInventory = this.state.inventory;

		const index = this.rooms[tempCurrentRoom].items.indexOf(itemKey);
		this.rooms[tempCurrentRoom].items.splice(index, 1);

		tempInventory.add(itemKey);

		// Remove navigation when clicked
	    let tempContent = this.state.mainContent;
	    tempContent = tempContent.slice(0, tempContent.length-1);

    	let tempContentQueue = this.state.contentQueue;
		tempContentQueue.push(
		      <Row>
		        {this.contentPiece(
		        	"You look closer at "+this.items[itemKey].name+". "+this.items[itemKey].desc,
		        	"left"
			    )}
		      </Row>
		);
		tempContentQueue.push(
		      <Row>
		        {this.contentPiece(
			        this.items[itemKey].pickup,
			        "left"
			    )}
		      </Row>
		);

		this.setState({
			inventory: tempInventory,

			contentQueue: tempContentQueue,
			mainContent: tempContent,
		}, this.prompt);
	}

	changeRoom(newRoom){
	    if(!(newRoom in this.rooms)){
		    return;
	    }

	    // Remove navigation when clicked
	    let tempContent = this.state.mainContent;
	    tempContent = tempContent.slice(0, tempContent.length-1);

	    // Room exit text-- eventually different for each room?
	    let tempContentQueue = this.state.contentQueue;
	    tempContentQueue.push(
		      <Row>
		        {this.contentPiece(
			        "You leave "+this.rooms[this.state.currentRoom].name+" and enter "+this.rooms[newRoom].name+".",
			        "center"
		        )}
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
						{this.contentPiece(
							this.rooms[tempCurrentRoom].desc,
							"left"
						)}
					</Row>
		    );
	    }else{
	    	tempContentQueue.push(
		    		<Row>
			    		{this.contentPiece(
			    			"You are in "+this.rooms[tempCurrentRoom].name+".",
			    			"left"
		    			)}
			      </Row>
		    );
	    }	    

	    // list objects visible
	    let tempItems = this.rooms[tempCurrentRoom].items;

	    if(tempItems && tempItems.length > 0){
	    	tempContentQueue.push(
					<Row>
						<Col className={"content-piece text-left "+this.state.animate?"item-fadein":""}>Scanning the room, you see&nbsp;
							{Object.values(tempItems.slice(0, tempItems.length-1)).map((itemKey) => (
								<span>
									{this.appLink(
											this.items[itemKey].name,
											() => this.pickupItem(itemKey)
									)}&nbsp;
									{this.items[itemKey].location},&nbsp; 
								</span>
							))}
							{Object.values(tempItems.slice(tempItems.length-1, 
															tempItems.length)).map((itemKey) => (
								<span>
									{this.appLink(
											this.items[itemKey].name,
											() => this.pickupItem(itemKey)
									)}&nbsp;
									{this.items[itemKey].location}.&nbsp; 
								</span>
							))}
						</Col>
					</Row>
			);
		}

	    // list movement options
	    let tempNeighbors = this.rooms[tempCurrentRoom].neighbors;

	    tempContentQueue.push(
	        <Row>
				<Col className={"content-piece text-left "+this.state.animate?"item-fadein":""}>You can move&nbsp;
		            {Object.values(tempNeighbors.slice(0, tempNeighbors.length-1)).map((neighbor) => (
			            <span>
			                {neighbor.direction} to {this.appLink(
									            	this.rooms[neighbor.key].name,
								                	() => this.changeRoom(neighbor.key))
									            },&nbsp; 
			            </span>
		            ))}
		            {Object.values(tempNeighbors.slice(tempNeighbors.length-1, 
										            	tempNeighbors.length)).map((neighbor) => (
			            <span>
			                or {neighbor.direction} to {this.appLink(
									            	this.rooms[neighbor.key].name,
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

	contentPiece(content, alignment){
		return(
			<Col className={"content-piece text-"+alignment+(this.state.animate?" item-fadein":"")}>
				{content}
			</Col>
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
