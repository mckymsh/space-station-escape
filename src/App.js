import React, { Component } from 'react';
// import { Container, Row, Col,} from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import './stars.scss';
import './App.css'; 

import { defaultRooms, defaultItems, intro, endings,} from './objectMaps.js';

// const FADE_DURATION = 1500;
const TICK_TIME = 2000;

// var lastTick = 0;
// var thisTick = 0;

class App extends Component {

	constructor(props){
	    super(props);

	    this.state = {
		    inventory: null,
		    currentRoom: null,
		    roomsVisited: null,
		    suitOn: false,

		    contentQueue: [],
		    mainContent: [],
		    animate: true,
		    isFading: false,
		    currentTick: 0,
	    };
	}

	componentDidMount(){
	    this.reset();
	}

	componentDidUpdate() {
	    this.scrollToBottom();
	}

	tick(){

		// thisTick = new Date().getTime();

		// console.log(thisTick - lastTick);

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

		// lastTick = new Date().getTime();
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
	    		{this.tick()}, TICK_TIME);

	    this.setState({
	    	inventory: tempInventory,
	    	currentRoom: randomKey,
	    	roomsVisited: tempVisited,
	    	contentQueue: [],
	    	mainContent: [],
	    }, this.intro);

	    let tempMain = document.getElementById("mainContent");
	    if(tempMain && this.state.mainContent.length > 0){
		    tempMain.getElementsByClassName("content-piece")[0].innerHTML = "farts";//focus();
	    }
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
		        <section className={"content-piece "+(this.state.animate?"item-fadein ":" ")+"text-"+intro[i].alignment}>
			        {intro[i].text}
		        </section>
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

	    let tempContentQueue = this.state.contentQueue;

		// hackish, but hey it works
		if(this.state.suitOn){
			tempInventory.delete("spaceSuit");
			this.rooms[tempCurrentRoom].items.push("spaceSuit");
			this.items["spaceSuit"].location = "on the floor";
			this.items["spaceSuit"].pickup = "You lift it from the floor and throw it over your shoulder."
			this.items["spaceSuit"].carry = "over your shoulder";
			tempContent.push(
				<section className={"content-piece text-left "+(this.state.animate?"item-fadein":"")}>
					{this.items["spaceSuit"].use}
				</section>
			);
			tempContentQueue.push(
				<section className={"content-piece text-left "+(this.state.animate?"item-fadein":"")}>
					{this.items[itemKey].desc}
				</section>
			);
			this.setState({
				suitOn: false,
			})
		}else{
			tempContent.push(
				<section className={"content-piece text-left "+(this.state.animate?"item-fadein":"")}>
					{this.items[itemKey].desc}
				</section>
			);
		}

		tempContentQueue.push(
			<section className={"content-piece text-right "+(this.state.animate?"item-fadein":"")}>
				{this.items[itemKey].pickup}
			</section>
		);

		this.setState({
			inventory: tempInventory,
			contentQueue: tempContentQueue,
			mainContent: tempContent,
			isFading: false,
		}, this.prompt);
	}

	useItem(itemKey){
		// Remove navigation when clicked... again
	    let tempContent = this.state.mainContent;
	    tempContent = tempContent.slice(0, tempContent.length-1);
    	
		// tempContent.push(
		// 	<section className={"content-piece text-left "+(this.state.animate?"item-fadein":"")}>
		// 		You use the {this.items[itemKey].name}!
		// 	</section>
		// );

		let tempContentQueue = this.state.contentQueue;
		let tempInventory = this.state.inventory;
		let tempCurrentRoom = this.state.currentRoom;

		// https://stackoverflow.com/questions/6513585/test-for-multiple-cases-in-a-switch-like-an-or
		// "fall-through"

		// This is repetitive trash
		switch(itemKey){
			case "wrench":
				window.alert("How did you get the wrench?");
				break;		
			case "spaceSuit":
				tempContentQueue.push(
					<section className={"content-piece text-center "+(this.state.animate?"item-fadein":"")}>
						{this.items[itemKey].use}
					</section>
				);
				for(let itemKey of tempInventory){
					this.items[itemKey].location = "on the floor";
					if(itemKey !== "spaceSuit"){
						this.rooms[tempCurrentRoom].items.push(itemKey);
					}
				}
				// this.rooms[tempCurrentRoom].items.splice(
				// 	0,
				// 	this.rooms[tempCurrentRoom].items.indexOf("spaceSuit")
				// );
				tempInventory.clear();
				tempInventory.add("spaceSuit");
				this.items["spaceSuit"].carry = "on your body";
				this.setState({
					inventory: tempInventory,
					suitOn: true,
				})
				break;
			case "tube":
			case "tape":
				if(tempInventory.has("spaceSuit")
				&& tempInventory.has("knife")
				&& tempInventory.has("tube")
				&& tempInventory.has("tape")){

					tempInventory.delete("tube");
					tempInventory.delete("tape");
					tempInventory.add("hose");

					tempContentQueue.push(
						<section className={"content-piece text-center "+(this.state.animate?"item-fadein":"")}>
							{this.items["hose"].pickup}
						</section>
					);
				}else{
					tempContentQueue.push(
						<section className={"content-piece text-center "+(this.state.animate?"item-fadein":"")}>
							{this.items[itemKey].use}
						</section>
					);
				}
				break;
			case "mealPack":
			case "bioFoam":
				if(tempInventory.has("spaceSuit")
				&& tempInventory.has("knife")
				&& tempInventory.has("mealPack")
				&& tempInventory.has("bioFoam")){

					tempInventory.delete("mealPack");
					tempInventory.delete("bioFoam");
					tempInventory.add("patch");

					tempContentQueue.push(
						<section className={"content-piece text-center "+(this.state.animate?"item-fadein":"")}>
							{this.items["patch"].pickup}
						</section>
					);
				}else{
					tempContentQueue.push(
						<section className={"content-piece text-center "+(this.state.animate?"item-fadein":"")}>
							{this.items[itemKey].use}
						</section>
					);
				}
				break;
			default:
				tempContentQueue.push(
					<section className={"content-piece text-right "+(this.state.animate?"item-fadein":"")}>
						{this.items[itemKey].use}
					</section>
				);
		}

		this.setState({
			// inventory: tempInventory,
			contentQueue: tempContentQueue,
			mainContent: tempContent,
			isFading: false,
		}, this.prompt);
	}

	navigation(fadeOut){

		return(
			<div className={(this.state.animate?"item-fadein":"")
										+(fadeOut&&this.state.animate?" item-fadeout":"")}>
				{(this.rooms[this.state.currentRoom].items.length > 0)? this.itemList() : null}
				{(this.state.inventory.size > 0)? this.inventoryList() : null}
				{this.moveList()}
	        </div>
        );
	}

	itemList(){
		let tempItems = this.rooms[this.state.currentRoom].items;

		return(
			<section className="content-piece text-left">There is&nbsp;
				{Object.values(tempItems.slice(0, tempItems.length-1)).map((itemKey) => (
					<span key={itemKey}>
						a {this.appLink(
								this.items[itemKey].name,
								() => this.handleNav(() => {this.pickupItem(itemKey)})
						)} {this.items[itemKey].location},&nbsp;
					</span>
				))}
				{Object.values(tempItems.slice(tempItems.length-1, 
												tempItems.length)).map((itemKey) => (
					<span key={itemKey}>
						{tempItems.length > 1 ? "and a " : "a "}{this.appLink(
								this.items[itemKey].name,
								() => this.handleNav(() => {this.pickupItem(itemKey)})
						)} {this.items[itemKey].location}.
					</span>
				))}
			</section>
		);
	}

	inventoryList(){
		// Iterators still elude me
		let tempInventory = Array.from(this.state.inventory.keys());
		return(
			<section className="content-piece text-left">You have&nbsp;
				{Object.values(tempInventory.slice(0, tempInventory.length-1)).map((itemKey) => (
					<span key={itemKey}>
						a {this.appLink(
								this.items[itemKey].name,
								() => this.handleNav(() => {this.useItem(itemKey);})
						)} {this.items[itemKey].carry},&nbsp;
					</span>
				))}
				{Object.values(tempInventory.slice(tempInventory.length-1, 
												tempInventory.length)).map((itemKey) => (
					<span key={itemKey}>
						{(tempInventory.length > 1)? "and a " : "a "}{this.appLink(
								this.items[itemKey].name,
								() => this.handleNav(() => {this.useItem(itemKey);})
						)} {this.items[itemKey].carry} 
					</span>
				))}.
			</section>
		);
	}

	moveList(){
		let tempCurrentRoom = this.state.currentRoom;
	    let tempNeighbors = this.rooms[tempCurrentRoom].neighbors;

		return(
			<section className="content-piece text-left">You can move&nbsp;
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
		                {(tempNeighbors.length > 1)? "or " : ""}{neighbor.direction} to {this.appLink(
								            	this.rooms[neighbor.key].name,
							                	() => this.handleNav(() => {this.changeRoom(neighbor.key)})
								            )}. 
		            </span>
	            ))}
	        </section>
		);
	}

	handleNav(navFunction){
		if(!this.state.animate){
			navFunction();
			return;
		}

		// Remove navigation when clicked.
		// I replace it here with an identical version, except
		// the className is different. React wouldn't add the
		// class and re-render otherwise. Very dumb. 
		// Or maybe I am. Time will tell.
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
			<section className={"content-piece text-center"+(this.state.animate?" item-fadein":"")}>
				You leave {this.rooms[this.state.currentRoom].name} and enter {this.rooms[newRoom].name}.
			</section>
    	)

    	if(newRoom === 'space'){
    		let tempInventory = this.state.inventory;
    		let tempSuitOn = this.state.suitOn;
    		let tempEnding = "";

			// don't matter if you got it if you ain't wearin' it!
	    	if(!tempInventory.has("spaceSuit") || !tempSuitOn){ 
	    		tempEnding = "space_noSuit";
			}else if(!tempInventory.has("hose")){
				tempEnding = "space_leakSuit"; // temporary
		    }else if(!tempInventory.has("patch")){
		    	tempEnding = "space_leakSuit";
		    }else{
		    	tempEnding = "space_fixSuit";
		    }
		    this.setState({
			    currentRoom: newRoom,

			    mainContent: tempContent,	

			    isFading: false,	    
		    }, () => {this.endingSequence(tempEnding)});
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
					<section className={"content-piece text-"+descPiece.alignment+(this.state.animate?" item-fadein":"")}>
						{descPiece.text}
					</section>
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

	endingSequence(endingType){
		var tempContentQueue = this.state.contentQueue;

		if(!(endingType in endings)){
			// Something has gone terribly wrong.
			return;
		}
	    
		endings[endingType].map((item) => (
	        tempContentQueue.push(
	        	<section className={"content-piece text-"+item.alignment
								+(this.state.animate?" item-fadein":"")}>
					{item.text}
				</section>
			)
		));

		tempContentQueue.push(
			<section className={"content-piece text-center"
							+(this.state.animate?" item-fadein":"")}>
				{this.appLink("restart", () => this.reset())}
			</section>
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

		if(!prevAnimate){
			clearInterval(this.tickInterval);
		    this.tickInterval = setInterval(() => 
		    		{this.tick()}, TICK_TIME);
		}else{
			clearInterval(this.tickInterval);
			this.tickInterval = setInterval(() =>
					{this.tick()}, TICK_TIME/4);
		}

	    this.setState({
		    animate: !prevAnimate,
	    });
	}

	appLink(text, clickFunction){
	    return(
		    <a
			    href="./#" 
		        className="App-link"
		        onClick={clickFunction}
		    >{text}</a>
	    );
	}

	render(){
	    return(
	    	<React.Fragment>
		    	<div id="stars" className={"stars"+(this.state.animate?"":" no-animate")}></div>
				<div id="stars2" className={"stars"+(this.state.animate?"":" no-animate")}></div>
				<div id="stars3" className={"stars"+(this.state.animate?"":" no-animate")}></div>
			    <div className="App">
				    <header className="title text-center">
					    <span>SPACE STATION ESCAPE</span>
	 			    </header>
				    <nav className="Actions text-center">
				        -&nbsp;{
						        	<button
							        	type="button" 
								        className={"App-link"+(this.state.animate ? "" : " deactivated")}
								        onClick={() => this.toggleAnimation()}
								    >animate</button>
								}&nbsp;-&nbsp;{
									<button
							        	type="button" 
								        className={"App-link"}
								        onClick={() => this.reset()}
								    >restart</button>
								}&nbsp;-
			        </nav>
			        <main id="mainContent" className="Main-Content item-fadein">
			            {this.state.mainContent.map((item, index) => (
			            	<div id={index} key={index}>{item}</div>
			            ))}
				        <section>
				            <div
				                className="contentEnd-filler" 
				                ref={(el) => { this.contentEnd = el; }}>
				            </div>
			            </section>
			        </main>
				</div>
			</React.Fragment>
	    );
	}
}

export default App;
