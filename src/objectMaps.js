const rooms = {
	"southHub": {
		name: "the southern hub", 
		desc: 
				`From this central hub, there are \
				several passages leading to segments \
				of the outer ring. Another connects \
				this ring to the other ring.`, 
		neighbors: [
			{key: "engineering", direction: "left", },
			{key: "storage", direction: "front",},
			{key: "physicsLab", direction: "back",}, 
			{key: "bioLab", direction: "right",},
			{key: "northHub", direction: "north",},
			{key: "airlock", direction: "south",},
		]
	},
	"airlock": {
		name: "the airlock", 
		desc: 
				`The interior door is locked, and the \
				exterior is open. But that's only \
				possible if someone went outside... \
				and didn't come back.`, 
		neighbors: [
			{key: "southHub", direction: "north"},
			{key: "space", direction: "south"},
		]
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
		]
	},
	"engineering": {
		name: "engineering", 
		desc: 
				`Rodney was never very neat, but even his \
				disorganized ass would be dismayed at the \
				disarray here. Tools and parts are strewn \
				about. Perhaps you aren't the first person \
				to scavenge here.`, 
		neighbors: [
			{key: "storage", direction: "spinward"},
			{key: "physicsLab", direction: "antispinward"},
			{key: "southHub", direction: "inward"},
		]
	},
	"physicsLab": {
		name: "the physics lab", 
		desc: 
				`The lab is decorated with a vast \
				array of instruments and equipment. \
				Some of it might be useful. Eventually.`, 
		neighbors: [
			{key: "engineering", direction: "spinward"},
			{key: "bioLab", direction: "antispinward"},
			{key: "southHub", direction: "inward"},
		]
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
		]
	},
	"northHub": {
		name: "the northern hub", 
		desc: 
				`This hub, arbitrarily designated as \
				'north', has passageways leading to \
				several rooms on the outer ring, and \
				one to the other end of the station.`, 
		neighbors: [
			{key: "hydroponics", direction: "left"},
			{key: "head", direction: "front"},
			{key: "foodPrep", direction: "back"}, 
			{key: "habitation", direction: "right"},
			{key: "southHub", direction: "south"},
			{key: "shuttleBay", direction: "north"},
		]
	},
	"shuttleBay": {
		name: "the shuttle bay", 
		desc: 
				`The bay is sparse. \
				through the small porthole in the locked \
				hatch, you see a distressing lack of shuttle.`, 
		neighbors: [
			{key: "space", direction: "north"},
			{key: "northHub", direction: "south"},
		]
	},
	"space": {
		name: "space", 
		desc: 
				`You shouldn't be here. \
				You're probably dead. \
				Apparently that doesn't slow you down. \
				Continue playing; don't mind me.`, 
		neighbors: [
			{key: "northHub", direction: "south"},
			{key: "southHub", direction: "north"},
		]
	},
	"hydroponics": {name: "hydroponics", desc: 
					`Long rows of what you assume \
					were once well-tended plants \
					extend along the curve of \
					the station. Not pretty, but \
					maybe the reason you're still \
					breathing.`, 
		neighbors: [
			{key: "head", direction: "spinward"}, 
			{key: "foodPrep", direction: "antispinward"},
			{key: "northHub", direction: "inward"},
		]
	},
	"head": {
		name: "the head", 
		desc: 
				`A fancy space bathroom. You suppose. \
				Not sure what all those hoses and straps \
				are for...`, 
		neighbors: [
			{key: "habitation", direction: "spinward"}, 
			{key: "hydroponics", direction: "antispinward"},
			{key: "northHub", direction: "inward"},
		]
	},
	"habitation": {
		name: "habitation", 
		desc: 
				`'Cozy' would be a euphemistic \
				descriptor for these tiny personal \
				spaces. A storage locker, a bed seemingly \
				for a toddler, and a curtain for \
				'privacy'. Lovely.`, 
		neighbors: [
			{key: "foodPrep", direction: "spinward"}, 
			{key: "head", direction: "antispinward"},
			{key: "northHub", direction: "inward"},
		]
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
		]
	},
};

const intro = [
	{ alignment: "left", 
		time: 1000, 
		text: `You awake.`
	},
	{ alignment: "center", 
		time: 1000,  
		text: `Like sand in your eye, reality demands your \
			attention, but resists your desire to return \
			to sleep.`
	},
	{ alignment: "right", 
		time: 1000,  
		text: `Your shattered memory is as unhelpful as a \
			squid on a beach.
	`},
	{ alignment: "left",
		time: 1000, 
		text: `Last you remember, Rosa was leaving you in the \
			lab-- another late night, nothing unusual. What \
			is a day when in space?`
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

export default rooms;

export {rooms, intro};