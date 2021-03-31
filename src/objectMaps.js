const defaultRooms = {
	"southHub": {
		name: "the southern hub", 
		desc: [
			{ 
				alignment: "left", 
				text:
					`From this central hub (one of two such hubs), \
					there are several passages leading to segments \
					of the outer ring. `,
			},
			{
				alignment: "left",
				text: `Another connects this ring to the 'northern' ring.`, 
			},
		],
		neighbors: [
			{key: "engineering", direction: "left", },
			{key: "storage", direction: "forward",},
			{key: "laboratory", direction: "back",}, 
			{key: "hydroponics", direction: "right",},
			{key: "northHub", direction: "north",},
			{key: "airlock", direction: "south",},
		],
		items: [],
	},
	"airlock": {
		name: "the airlock", 
		desc: [
			{ 
				alignment: "left", 
				text: 
					`The airlock's inner door is open, but thankfully \
					the outer door is still sealed. The \
					control panel on the wall is smashed, so you can't \
					cycle the airlock. \
					The outer door itself has an emergency release.`,
			},
			{
				alignment: "right",
				text: `Though, with no way to seal the heavy inner door, \
					using it would be an irreversible decision.`,  
			},
		],
		neighbors: [
			{key: "southHub", direction: "north"},
			{key: "space", direction: "south"},
		],
		items: [],
	},
	"storage": {
		name: "storage", 
		desc: [
			{ 
				alignment: "left", 
				text: 
					`This room has rigs to hold spacesuits \
					as well as other tools and supplies  \
					for EVA. There are also few other bulky \
					bits and bobs that wouldn't fit elsewhere.`,  
			},
		],
		neighbors: [
			{key: "hydroponics", direction: "spinward"},
			{key: "engineering", direction: "antispinward"},
			{key: "southHub", direction: "inward"},
		],
		items: ["spaceSuit",],
	},
	"engineering": {
		name: "engineering", 
		desc: [
			{ 
				alignment: "left", 
				text: 
					`As a technician, you take pride in keeping \
					your work area clear. Given that, you are \
					dismayed at the state of your repair station.`,
			},
			{
				alignment: "left",
				text: `Tools and parts are strewn everywhere, \
					and smears of grease and glue on every surface.`,
			},
			{
				alignment: "center",
				text: `Perhaps you aren't the first person \
					to scavenge here.`,  
			},
		],
		neighbors: [
			{key: "storage", direction: "spinward"},
			{key: "laboratory", direction: "antispinward"},
			{key: "southHub", direction: "inward"},
		],
		items: ["tape",],
	},
	"laboratory": {
		name: "the physics lab", 
		desc: [
			{ 
				alignment: "left", 
				text: 
					`This lab is decorated with a vast \
					array of instruments and equipment.`,
			},
			{
				alignment: "left",
				text: `Is that a laser or particle accelerator? \
					Who knows. Not your specialty.`,  
			},
		],
		neighbors: [
			{key: "engineering", direction: "spinward"},
			{key: "hydroponics", direction: "antispinward"},
			{key: "southHub", direction: "inward"},
		],
		items: [],
	},      
	"hydroponics": {
		name: "hydroponics", 
		desc: [
			{ 
				alignment: "left", 
				text:  
					`Long rows of what you assume \
					were once well-tended plants \
					extend along the 'upward'-curving \
					floor of the northern ring.`,
			},
			{
				alignment: "center",
				text: `Not pretty, but maybe the reason \
					you're still breathing.`,  
			},
		],
		neighbors: [
			{key: "laboratory", direction: "spinward"}, 
			{key: "storage", direction: "antispinward"},
			{key: "southHub", direction: "inward"},
		],
		items: [],
	},
	"northHub": {
		name: "the northern hub", 
		desc: [
			{ 
				alignment: "left", 
				text: 
					`This hub, arbitrarily designated as \
					'north', has passageways leading to \
					several rooms on the outer ring, and \
					one to the 'southern' end of the \
					twin-ringed station.`,  
			},
		],
		neighbors: [
			{key: "medical", direction: "left"},
			{key: "head", direction: "forward"},
			{key: "foodPrep", direction: "back"}, 
			{key: "habitation", direction: "right"},
			{key: "southHub", direction: "south"},
			{key: "shuttleBay", direction: "north"},
		],
		items: [],
	},
	"shuttleBay": {
		name: "the shuttle bay", 
		desc: [
			{ 
				alignment: "left", 
				text: 
					`If memory — and the handy available sign — serve, this \
					hatch leads to the shuttle via an airlock. You peek \
					through the porthole.`,
			},
			{
				alignment: "left",
				text: `Well, the good news is that the shuttle is still here.`,  
			},
			{
				alignment: "right",
				text: `The bad news is that it's no longer clamped to the \
				station, but floating loosely, only tied to the station by \
				its power & air umbilical.`,  
			},
		],
		neighbors: [
			// {key: "space", direction: "north"},
			{key: "northHub", direction: "south"},
		],
		items: [],
	},
	"shuttle": {
		name: "the escape shuttle", 
		desc: [
			{ 
				alignment: "left", 
				text: 
					`You've made it to the shuttle.`,
			},
			{
				alignment: "left",
				text: `At this point, that means the game is very broken. \
					maybe let me know so I can fix it.`,  
			},
		],
		neighbors: [
			{key: "space", direction: "outside"},
		],
		items: [],
	},
	"space": {
		name: "space", 
		desc: [
			{ 
				alignment: "left", 
				text: 
					`You're probably dead. \
					Apparently that doesn't slow you down. \
					Continue playing; don't mind me.`, 
			},
		],
		neighbors: [
			{key: "airlock", direction: "south"},
			{key: "shuttle", direction: "north"},
		],
		items: [],
	},
	"medical": {
		name: "the medical bay", 
		desc: [
			{ 
				alignment: "left", 
				text:  
					`This medical bay is small, but sufficient \
					for this small of a crew.`,
			},
			{ 
				alignment: "left", 
				text:  
					`Now that it's just you, it feels like you \
					have a whole hospital to yourself.`,
			},
			{ 
				alignment: "right", 
				text:  
					`Hm. No doctors, though.`,
			},
		],
		neighbors: [
			{key: "head", direction: "spinward"}, 
			{key: "foodPrep", direction: "antispinward"},
			{key: "northHub", direction: "inward"},
		],
		items: ["bioFoam",],
	},
	"head": {
		name: "the head", 
		desc: [
			{ 
				alignment: "left", 
				text: 
					`This is a fancy space bathroom.`,
			},
			{
				alignment: "right",
				text: ` You suppose.`,
			},
			{
				alignment: "center",
				text: `You've been here for months, and you're \
					still not sure what all the tubes and \
					straps are for.`,  
			},
		],
		neighbors: [
			{key: "habitation", direction: "spinward"}, 
			{key: "medical", direction: "antispinward"},
			{key: "northHub", direction: "inward"},
		],
		items: ["tube",],
	},
	"habitation": {
		name: "habitation", 
		desc: [
			{ 
				alignment: "left", 
				text: 
					`'Cozy' would be a euphemistic \
					descriptor for these tiny personal \
					spaces. A storage locker, a bed seemingly \
					for a toddler, and naught but a curtain \
					for privacy.`,
			},
			{
				alignment: "center",
				text: `Lovely.`,  
			},
		],
		neighbors: [
			{key: "foodPrep", direction: "spinward"}, 
			{key: "head", direction: "antispinward"},
			{key: "northHub", direction: "inward"},
		],
		items: ["knife",],
	},
	"foodPrep": {
		name: "the food prep area", 
		desc: [
			{ 
				alignment: "left", 
				text: 
					`You can see why they don't call this 'prep area' \
					a kitchen. Pre-portioned food, latched cabinets, \
					a microwave...`,
			},
			{
				alignment: "right",
				text: `not exactly Michelin-rated.`, 
			},
		],
		neighbors: [
			{key: "medical", direction: "spinward"}, 
			{key: "habitation", direction: "antispinward"},
			{key: "northHub", direction: "inward"},
		],
		items: ["mealPack",],
	},
};

const defaultItems = {
	"wrench": {
		name: "wrench",
		desc: `A big, burly pipe wrench.`,
		location: "in another dimension",
		pickup: `You should not be able to read this.`,
		carry: "through your belt",
		use: `Seriously, how do you have this?.`,
	},
	"spaceSuit": {
		name: "space suit",
		desc: `The suit looks largely complete, but there's \
			a small puncture in one of the elbows, and the hose \
			to the oxygen tank looks like it's been sliced \
			clean through. Almost looks like it was cut with a knife.`,
		location: "in its rack",
		pickup: `You carefully remove the suit from its rig \
			and throw it over your shoulder.`,
		carry: "over your shoulder",
		use: `This thing is heavy.`,
	},
	"knife": {
		name: "small pocket knife",
		desc: `You've had this little knife for years. Snuck it \
			onto every ship or station you've worked on. It's \
			saved your butt many times in a figurative sense; \
			maybe now it'll do so literally.`,
		location: "on your bed",
		pickup: `In a well-practiced motion, you flip it open, \
			close it, and clip it to your belt. It's nice to \
			have something familiar.`,
		carry: "on your belt",
		use: `Still there, still sharp. Looks like it could cut \
			anything pretty easily, including you.`,
	},
	"tube": {
		name: "loose tube",
		desc: `A long rubber tube, used to, \
			presumably, uh... transfer fluids.`,
		location: "dangling freely from the wall",
		pickup: `You wrap the tube tightly around your body. Nice.`,
		carry: "around your body",
		use: `It's funny, this tube looks about the same \
			size as the hoses they use for oxygen lines. \
			You choose not to meditate on the possible \
			implications of that interoperability.`,
	},
	"tape": {
		name: "roll of duct tape",
		desc: `You'd think there'd be some sort of \
			fancy space duct tape. Nope. Turns out, \
			they had it right the first time. Sticky, \
			holds air, tough to tear.`,
		location: "on a hook on the wall",
		pickup: `You contort your hand and slip it through \
			the roll. Duct tape always comes in handy.`,
		carry: "on your wrist",
		use: `You check to make sure there's a free end. \
			yep, should be easy to peel.`,
	},
	"hose": {
		name: "makeshift tube",
		desc: `Having patched the old hose, the suit can \
			now allow you to breathe. What a luxurious \
			feature.`,
		location: "on the back of the suit",
		pickup: `You use your trusty knife to hack out the damanged \
			section of hose, slide your tube in its place, \
			and wrap, like, all the duct tape around the ends. \
			Good enough for pee, good enough for air. Right?`,
		carry: "on the back of the suit",
		use: `If you put your hand over your eyes, it almost \
			looks professional. Just like the original!`,
		// use: `Do not try and bend the hose, that’s impossible. \
		// 	Instead, only try to realize the truth... \
		// 	There is no hose. Then you’ll see that it is not \
		// 	the hose that bends, it is only yourself.`,
	},
	"mealPack": {
		name: "meal pack",
		desc: `A foil-covered blob of... something.`,
		location: "in the cooler",
		pickup: `Having defrosted with the lack of power, \
			it's a bit squishy. The foil wrapper seems \
			undamaged, so it's probably safe to eat. Like, \
			medically, if not psychologically.`,
		carry: "in your right pocket",
		use: `With some difficulty, you pull apart the thick \
			foil and take a bite. Horrible. You'll save the \
			bit of foil and food for when you're truly \
			desperate. For now, back in the pocket.`,
	},
	"bioFoam": {
		name: "tube of BioFoam™",
		desc: `BioFoam™, AKA "wound glue" is meant as an \
			emergency sealant for grievous injuries. Blood loss \
			is no joke, especially in space. It's sticky, \
			anti-microbial, and mildly anesthetic. Good stuff \
			to have around.`,
		location: "in the first aid cabinet",
		pickup: `You aren't bleeding (yet), so you put the \
			BioFoam in one of your pockets.`,
		carry: "in your left pocket",
		use: `You don't have any injuries necessitating this \
			kind of skin glue. Maybe it could stick something \
			else together?`,
	},
	"patch": {
		name: "patch",
		desc: `A kludge-y patch of duct tape and rubber.`,
		location: "on the suit's elbow",
		pickup: `You use your knife to cut a rectangle out \
			of the meal pack wrapper, squirt some BioFoam \
			into the hole in the suit's elbow, \
			and slap the wrapper on top, holding it for a \
			moment. You pull your hand away, and it stays. \
			Perfect! Just like brand-new.`,
		carry: "on the suit's elbow",
		use: `You double-check the patch. It's still holding.`,
	},
};

const intro = [
	{ alignment: "center", 
		text: `You awake.`
	},
	{ alignment: "left", 
		text: `Like an errant grain of sand, reality digs into \
			your eye, demanding your attention.`
	},
	{ alignment: "right", 
		text: `Your scattered memory is as helpful as a \
			squid on a beach.
	`},
	{ alignment: "left",
		text: `Last you remember, you were alone in the \
			lab— another late night, nothing unusual.`
	},
	{ alignment: "center", 
		text: `Yet here you are.`
	},
	{ alignment: "left", 
		text: `Flopped in a random part of the station, \
			apparently recently unconscious. What happened?`
	},
	{ alignment: "center", 
		text: `You look around.`
	},
];

const endings = {
	"space_noSuit": [
		{ alignment: "left", 
			text: `Your unprotected body flops in the emptiness.`
		},
		{ alignment: "center", 
			text: `Your lungs implode as your eyes bulge.`
		},
		{ alignment: "right", 
			text: `Your death isn't pretty.`
		},
		{ alignment: "left", 
			text: `That's okay.`
		},
		{ alignment: "center", 
			text: `No one's there to see it.`
		},
	],
	"space_leakSuit": [
		{ alignment: "left", 
			text: `You immediately hear the hiss of moving air.`
		},
		{ alignment: "right", 
			text: `A tiny slit in the arm has ruptured.`
		},
		{ alignment: "left", 
			text: `As your precious air abandons you, its moisture \
			crystalizes, brilliant in the unfiltered sunlight`
		},
		{ alignment: "center", 
			text: `Yet in moments, that beauty will be pointless.`
		},
		{ alignment: "center", 
			text: `No one's there to see it.`
		},
	],	
	"psychoticLoneliness": [
		{ alignment: "center",
			text: `You didn't die, but you will soon!`
		},
	],
	"space_fixSuit": [
		{ alignment: "center", 
			text: `You didn't die! Dramatic text forthcoming.`
		},
	],
}

// export default defaultRooms;

export {defaultRooms, defaultItems, intro, endings,};