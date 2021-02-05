const defaultRooms = {
	"southHub": {
		name: "the southern hub", 
		desc: 
				`From this central hub, there are \
				several passages leading to segments \
				of the outer ring. Another connects \
				this ring to the 'northern' ring.`, 
		neighbors: [
			{key: "engineering", direction: "left", },
			{key: "storage", direction: "front",},
			{key: "physicsLab", direction: "back",}, 
			{key: "bioLab", direction: "right",},
			{key: "northHub", direction: "north",},
			{key: "airlock", direction: "south",},
		],
		items: [],
	},
	"airlock": {
		name: "the airlock", 
		desc: 
				`The interior door is locked, and the \
				exterior is open. But that's only \
				possible if someone went outside... `, 
		neighbors: [
			{key: "southHub", direction: "north"},
			{key: "space", direction: "south"},
		],
		items: [],
	},
	"storage": {
		name: "storage", 
		desc: 
				`This storage room, conveniently located \
				near the airlock, holds all the supplies \
				for EVA, as well as a few other spares \
				that wouldn't fit elsewhere.`, 
		neighbors: [
			{key: "bioLab", direction: "spinward"},
			{key: "engineering", direction: "antispinward"},
			{key: "southHub", direction: "inward"},
		],
		items: ["tape"],
	},
	"engineering": {
		name: "engineering", 
		desc: 
				`Rodney, the tech guy, was never very neat, \
				but even his disorganized ass would be \
				dismayed at the disarray here. \
				Tools and parts are strewn about. \
				Perhaps you aren't the first person \
				to scavenge here.`, 
		neighbors: [
			{key: "storage", direction: "spinward"},
			{key: "physicsLab", direction: "antispinward"},
			{key: "southHub", direction: "inward"},
		],
		items: ["hose"],
	},
	"physicsLab": {
		name: "the physics lab", 
		desc: 
				`The lab is decorated with a vast \
				array of instruments and equipment. \
				Some of it might be useful. Eventually. \
				Watch this space (ba dum tss)`, 
		neighbors: [
			{key: "engineering", direction: "spinward"},
			{key: "bioLab", direction: "antispinward"},
			{key: "southHub", direction: "inward"},
		],
		items: [],
	},      
	"bioLab": {
		name: "the bio lab", 
		desc: 
				`There are many small containers with \
				insects and rodents. Amazingly, they \
				all seem to still be alive.`, 
		neighbors: [
			{key: "physicsLab", direction: "spinward"}, 
			{key: "storage", direction: "antispinward"},
			{key: "southHub", direction: "inward"},
		],
		items: [],
	},
	"northHub": {
		name: "the northern hub", 
		desc: 
				`This hub, arbitrarily designated as \
				'north', has passageways leading to \
				several rooms on the outer ring, and \
				one to the 'southern' end of the \
				twin-ringed station.`, 
		neighbors: [
			{key: "hydroponics", direction: "left"},
			{key: "head", direction: "front"},
			{key: "foodPrep", direction: "back"}, 
			{key: "habitation", direction: "right"},
			{key: "southHub", direction: "south"},
			{key: "shuttleBay", direction: "north"},
		],
		items: [],
	},
	"shuttleBay": {
		name: "the shuttle bay", 
		desc: 
				`The bay is sparse. \
				through the small porthole in the locked \
				hatch, you see a distressing lack of shuttle. \
				You're going to need a lot of therapy to deal \
				with the inevitable abandonment issues.`, 
		neighbors: [
			{key: "space", direction: "north"},
			{key: "northHub", direction: "south"},
		],
		items: [],
	},
	"space": {
		name: "space", 
		desc: 
				`You shouldn't be here. \
				You're probably dead. \
				Apparently that doesn't slow you down. \
				Continue playing; don't mind me.`, 
		neighbors: [
			{key: "airlock", direction: "south"},
			{key: "shuttleBay", direction: "north"},
		],
		items: [],
	},
	"hydroponics": {name: "hydroponics", desc: 
					`Long rows of what you assume \
					were once well-tended plants \
					extend along the 'upward'-curving \
					floor of the northern ring. Not \
					pretty, but	maybe the reason \
					you're still breathing.`, 
		neighbors: [
			{key: "head", direction: "spinward"}, 
			{key: "foodPrep", direction: "antispinward"},
			{key: "northHub", direction: "inward"},
		],
		items: [],
	},
	"head": {
		name: "the head", 
		desc: 
				`A fancy space bathroom. You suppose. \
				You've been here for months, and you're \
				still not sure what all the hoses and \
				straps are for.`, 
		neighbors: [
			{key: "habitation", direction: "spinward"}, 
			{key: "hydroponics", direction: "antispinward"},
			{key: "northHub", direction: "inward"},
		],
		items: [],
	},
	"habitation": {
		name: "habitation", 
		desc: 
				`'Cozy' would be a euphemistic \
				descriptor for these tiny personal \
				spaces. A storage locker, a bed seemingly \
				for a toddler, and naught but a curtain \
				for privacy. Lovely.`, 
		neighbors: [
			{key: "foodPrep", direction: "spinward"}, 
			{key: "head", direction: "antispinward"},
			{key: "northHub", direction: "inward"},
		],
		items: [],
	},
	"foodPrep": {
		name: "the food prep area", 
		desc: 
				`You can see why they don't call this \
				a kitchen. Latched cabinets, a microwave... \
				not exactly Michelin-rated.`, 
		neighbors: [
			{key: "hydroponics", direction: "spinward"}, 
			{key: "habitation", direction: "antispinward"},
			{key: "northHub", direction: "inward"},
		],
		items: ["mealPack",],
	},
};

const defaultItems = {
	"wrench": {
		location: "in another dimension",
		name: "a wrench",
		desc: `A big, burly pipe wrench.`,
		pickup: `You grab the wrench, \
			feeling its mass in your hand.`,
		use: `Sorry folks, can't use things yet.`,
	},
	"hose": {
		location: "under a workbench",
		name: "a hose",
		desc: `A long tube, originally from some \
			(probably important) part of the \
			life-support system.`,
		pickup: `Stretchy, bendy, fun fun fun! Even \
			if this proves useless, you have something \
			to play with, eh?`,
		use: `Sorry folks, can't use things yet.`,
	},
	"tape": {
		location: "on a shelf",
		name: "a roll of duct tape",
		desc: `You'd think there'd be some sort of \
			fancy space duct tape. Nope. Turns out, \
			they had it right the first time.`,
		pickup: `As you put it onto your wrist, you \
			notice that the end is frayed. Probably \
			should find something to cut this properly.`,
		use: `Sorry folks, can't use things yet.`,
	},
	"mealPack": {
		location: "in the cooler",
		name: "a meal pack",
		desc: `A foil-covered blob of... yeah. Something.`,
		pickup: `Having defrosted with the lack of power, \
			it's a bit squishy. The foil wrapper seems \
			undamaged, so it's probably safe to eat. Like, \
			medically, if not psychologically.`,
		use: `Sorry folks, can't use things yet.`,
	},
};

const intro = [
	{ alignment: "center", 
		time: 1000, 
		text: `You awake.`
	},
	{ alignment: "left", 
		time: 1000,  
		text: `Like and errant grain of sand, reality digs into \
			your eye, demanding your attention.`
	},
	{ alignment: "right", 
		time: 1000,  
		text: `Your scattered memory is as helpful as a \
			squid on a beach.
	`},
	{ alignment: "left",
		time: 1000, 
		text: `Last you remember, you were alone in the \
			lab-- another late night, nothing unusual.`
	},
	{ alignment: "center", 
		time: 1000, 
		text: `Yet here you are.`
	},
	{ alignment: "left", 
		time: 1000, 
		text: `Flopped in a random part of the station, \
			apparently recently unconscious. What happened?`
	},
	{ alignment: "center", 
		time: 1000, 
		text: `You look around.`
	},
];

export default defaultRooms;

export {defaultRooms, defaultItems, intro,};