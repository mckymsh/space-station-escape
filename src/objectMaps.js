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
			{key: "physicsLab", direction: "back",}, 
			{key: "bioLab", direction: "right",},
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
			{key: "bioLab", direction: "spinward"},
			{key: "engineering", direction: "antispinward"},
			{key: "southHub", direction: "inward"},
		],
		items: ["tape"],
	},
	"engineering": {
		name: "engineering", 
		desc: [
			{ 
				alignment: "left", 
				text: 
					`As a technician, you take pride in keeping \
					your work area clear. Given that, you are \
					dismayed at the state of Engineering.`,
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
			{key: "physicsLab", direction: "antispinward"},
			{key: "southHub", direction: "inward"},
		],
		items: ["hose"],
	},
	"physicsLab": {
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
			{key: "bioLab", direction: "antispinward"},
			{key: "southHub", direction: "inward"},
		],
		items: [],
	},      
	"bioLab": {
		name: "the bio lab", 
		desc: [
			{ 
				alignment: "left", 
				text: 
					`This is clearly a biology lab. There are many \
					small containers with insects and rodents.`,
			},
			{
				alignment: "center",
				text: `Amazingly, they all seem to still be alive.`,  
			},
		],
		neighbors: [
			{key: "physicsLab", direction: "spinward"}, 
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
			{key: "hydroponics", direction: "left"},
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
					`If memory (and the handy available sign) serve, this \
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
				text: `Not pretty, but	maybe the reason \
					you're still breathing.`,  
			},
		],
		neighbors: [
			{key: "head", direction: "spinward"}, 
			{key: "foodPrep", direction: "antispinward"},
			{key: "northHub", direction: "inward"},
		],
		items: [],
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
					still not sure what all the hoses and \
					straps are for.`,  
			},
		],
		neighbors: [
			{key: "habitation", direction: "spinward"}, 
			{key: "hydroponics", direction: "antispinward"},
			{key: "northHub", direction: "inward"},
		],
		items: [],
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
		items: [],
	},
	"foodPrep": {
		name: "the food prep area", 
		desc: [
			{ 
				alignment: "left", 
				text: 
					`You can see why they don't call this 'prep area' \
					a kitchen. Latched cabinets, a microwave...`,
			},
			{
				alignment: "right",
				text: `not exactly Michelin-rated.`, 
			},
		],
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
		carry: "through your belt",
		name: "wrench",
		desc: `A big, burly pipe wrench.`,
		pickup: `You grab the wrench, \
			feeling its mass in your hand.`,
		use: `Sorry folks, can't use things yet.`,
	},
	"hose": {
		location: "under a workbench",
		name: "hose",
		carry: "around your body",
		desc: `A long tube, originally from some \
			(probably important) part of the \
			life-support system.`,
		pickup: `Stretchy, bendy, fun fun fun! Even \
			if this proves useless, you have something \
			to play with, eh?`,
		use: `Do not try and bend the hose, that’s impossible. Instead, only try to realize the truth... \
			There is no hose. Then you’ll see that it is not the hose that bends, it is only yourself.`,
	},
	"tape": {
		location: "on a hook on the wall",
		name: "roll of duct tape",
		desc: `You'd think there'd be some sort of \
			fancy space duct tape. Nope. Turns out, \
			they had it right the first time.`,
		pickup: `As you put it onto your wrist, you \
			notice that the end is frayed. Probably \
			should find something to cut this properly.`,
		use: `It's not very effective.`,
	},
	"mealPack": {
		location: "in the cooler",
		carry: "in your pocket",
		name: "meal pack",
		desc: `A foil-covered blob of... yeah. Something.`,
		pickup: `Having defrosted with the lack of power, \
			it's a bit squishy. The foil wrapper seems \
			undamaged, so it's probably safe to eat. Like, \
			medically, if not psychologically.`,
		use: `You have died of dysentery.`,
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

const deaths = {
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
}

export default defaultRooms;

export {defaultRooms, defaultItems, intro, deaths,};