import React, { Component } from 'react';
import { Container, Row, Col,} from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import './stars.scss';
import './App.css'; 

import { defaultRooms, defaultItems, intro, deaths,} from './objectMaps.js';

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
		    isFading: false,
	    };
	}

	componentDidMount(){
	    this.reset();
	}

	componentDidUpdate() {
	    this.scrollToBottom();
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
	    if(this.state.animate && !this.state.isFading){
	    	this.contentEnd.scrollIntoView({
	    		behavior: "smooth", 
	    		block: "end"
	    	});
	    }
	}

	intro(){
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
		// add item to inventory & remove from room
		let tempCurrentRoom = this.state.currentRoom;
		let tempInventory = this.state.inventory;

		const index = this.rooms[tempCurrentRoom].items.indexOf(itemKey);
		this.rooms[tempCurrentRoom].items.splice(index, 1);

		tempInventory.add(itemKey);

		// Remove navigation when clicked... again
	    let tempContent = this.state.mainContent;
	    tempContent = tempContent.slice(0, tempContent.length-1);
    	
		tempContent.push(
		      <Row>
		        <Col className={"content-piece text-left "+this.state.animate?"item-fadein":""}>
			        You look closer at the {this.items[itemKey].name}. {this.items[itemKey].desc}
		        </Col>
		      </Row>
		);

		let tempContentQueue = this.state.contentQueue;
		tempContentQueue.push(
		      <Row>
		        <Col className={"content-piece text-right "+this.state.animate?"item-fadein":""}>
			        {this.items[itemKey].pickup}
		        </Col>
		      </Row>
		);

		this.setState({
			inventory: tempInventory,
			contentQueue: tempContentQueue,
			mainContent: tempContent,
			isFading: false,
		}, this.prompt);
	}

	navigation(fadeOut){
		let tempCurrentRoom = this.state.currentRoom;
		let tempItems = this.rooms[tempCurrentRoom].items;
	    let tempNeighbors = this.rooms[tempCurrentRoom].neighbors;

		return(
			<React.Fragment>
				{(tempItems.length > 0)? <Row>
					<Col className={"content-piece text-left"
							        +(this.state.animate?" item-fadein":"")
							        +(fadeOut&&this.state.animate?" item-fadeout":"")}>Scanning the room, you see a&nbsp;
						{Object.values(tempItems.slice(0, tempItems.length-1)).map((itemKey) => (
							<span key={itemKey}>
								{this.appLink(
										this.items[itemKey].name,
										() => this.handleNav(() => {this.pickupItem(itemKey)})
								)} {this.items[itemKey].location},&nbsp; 
							</span>
						))}
						{Object.values(tempItems.slice(tempItems.length-1, 
														tempItems.length)).map((itemKey) => (
							<span key={itemKey}>
								{this.appLink(
										this.items[itemKey].name,
										() => this.handleNav(() => {this.pickupItem(itemKey)})
								)} {this.items[itemKey].location}.&nbsp; 
							</span>
						))}
					</Col>
				</Row> : null}
				<Row>		
			        <Col className={"content-piece text-left"
							        +(this.state.animate?" item-fadein":"")
							        +(fadeOut&&this.state.animate?" item-fadeout":"")}>You can move&nbsp;
			            {Object.values(tempNeighbors.slice(0, tempNeighbors.length-1)).map((neighbor) => (
				            <span key={neighbor.key}>
				                {neighbor.direction} to {this.appLink(
										            	this.rooms[neighbor.key].name,
									                	() => this.handleNav(() => {this.changeRoom(neighbor.key)})
										            )},&nbsp; 
				            </span>
			            ))}
			            {Object.values(tempNeighbors.slice(tempNeighbors.length-1, 
											            	tempNeighbors.length)).map((neighbor) => (
				            <span key={neighbor.key}>
				                or {neighbor.direction} to {this.appLink(
										            	this.rooms[neighbor.key].name,
									                	() => this.handleNav(() => {this.changeRoom(neighbor.key)})
										            )}.&nbsp; 
				            </span>
			            ))}
			        </Col>
		        </Row>
	        </React.Fragment>
        );
	}

	handleNav(navFunction){
		if(!this.state.animate){
			navFunction();
			return;
		}

		// Remove navigation when clicked.
		// I replace it here with an idential version, except
		// the className is different. React wouldn't add the
		// class and re-render otherwise. Very dumb. Or maybe
		// I am. Time will tell.
	    let tempContent = this.state.mainContent;
	    tempContent = tempContent.slice(0, tempContent.length-1);

	    tempContent.push(
	        this.navigation(true)
	    );

	    this.setState({
	    	isFading: true,
		    mainContent: tempContent,
	    });

		setTimeout(()=>{
			navFunction();
		}, TICK_TIME/2);
	}

	changeRoom(newRoom){
	    if(!(newRoom in this.rooms)){
		    return;
	    }

	    // Remove navigation when clicked... again
	    let tempContent = this.state.mainContent;
	    tempContent = tempContent.slice(0, tempContent.length-1);

	    // Room exit text-- eventually different for each room?
	    tempContent.push(
		      <Row>
		        <Col className={"content-piece text-center"+(this.state.animate?" item-fadein":"")}>
			        You leave {this.rooms[this.state.currentRoom].name} and enter {this.rooms[newRoom].name}.
		        </Col>
		      </Row>
    	)

    	if(newRoom === 'space' /*...and no spacesuit*/){
	    	this.setState({
			    currentRoom: newRoom,

			    mainContent: tempContent,	

			    isFading: false,	    
		    }, () => {this.deathSequence("space_noSuit")});
	    }else{
		    this.setState({
			    currentRoom: newRoom,

			    mainContent: tempContent,	

			    isFading: false,	    
		    }, this.prompt);
	    }
	}

	prompt(){
	    var tempContentQueue = this.state.contentQueue;
	    var tempCurrentRoom = this.state.currentRoom;
	    var tempVisited = this.state.roomsVisited;

	    // If this is the first time we've been here, 
	    //     display room description.
	    if (!tempVisited.has(tempCurrentRoom)){
	    	tempVisited = tempVisited.add(tempCurrentRoom);
	    	this.rooms[tempCurrentRoom].desc.map((descPiece) => (
			    tempContentQueue.push(
					<Row>
						<Col className={"content-piece text-"+descPiece.alignment+(this.state.animate?" item-fadein":"")}>
							{descPiece.text}
						</Col>
					</Row>
			    )
		    ));
	    }else{
	    	// Nothing I guess
	    }	    

	    tempContentQueue.push(
	       this.navigation(false)
	    );

	    this.setState({
		    contentQueue: tempContentQueue,
	    });
	}

	deathSequence(deathType){
		var tempContentQueue = this.state.contentQueue;

		if(!(deathType in deaths)){
			// Something has gone terribly wrong.
			return;
		}
	    
		deaths[deathType].map((item) => (
	        tempContentQueue.push(
	        	<Row>
					<Col className={"content-piece text-"+item.alignment
									+(this.state.animate?" item-fadein":"")}>
						{item.text}
					</Col>
				</Row>
			)
		));

		tempContentQueue.push(
			<Row>
				<Col className={"content-piece text-center"
								+(this.state.animate?" item-fadein":"")}>
					{this.appLink("restart", () => this.reset())}
				</Col>
			</Row>
		)

	    this.setState({
	    	contentQueue: tempContentQueue,
	    	isFading: false,
	    });
	}

	toggleAnimation(){
		const prevAnimate = this.state.animate;

		// This is ugly please don't look at it
		// const stars = document.getElementsByClassName("stars");
		// for(var i = 0; i < stars.length; i++){
		// 	if(prevAnimate)
		// 	{
		// 		stars.item(i).classList.add("no-animate");
		// 	}else{
		// 		stars.item(i).classList.remove("no-animate");
		// 	}
		// }

	    this.setState({
		    animate: !prevAnimate,
	    });
	}

	appLink(text, clickFunction){
	    return(
		    <span 
		        className="App-link"
		        onClick={clickFunction}
		    >{text}</span>
	    );
	}

	render(){
	    return(
	    	<React.Fragment>
		    	<div id="stars" className={"stars"+(this.state.animate?"":" no-animate")}></div>
				<div id="stars2" className={"stars"+(this.state.animate?"":" no-animate")}></div>
				<div id="stars3" className={"stars"+(this.state.animate?"":" no-animate")}></div>
			    <div className="App">
				    <Container className="title text-center">
					    <span>SPACE STATION ESCAPE</span>
	 			    </Container>
				    <Container className="Actions text-center">
				        -&nbsp;{
						        	<span 
								        className={"App-link"+(this.state.animate ? "" : " deactivated")}
								        onClick={() => this.toggleAnimation()}
								    >animate</span>
								}&nbsp;-&nbsp;{
									this.appLink(
										"restart",
										 () => this.reset())
								}&nbsp;-
			        </Container>
			        <Container className="Main-Content">
			            {this.state.mainContent.map((item, index) => (
			            	<div key={index}>{item}</div>
			            ))}
				        <Row>
				            <Col>
					            <div
					                className="contentEnd-filler" 
					                ref={(el) => { this.contentEnd = el; }}>
					            </div>
				            </Col>
				        </Row>
			        </Container>
				</div>
			</React.Fragment>
	    );
	}
}

export default App;
