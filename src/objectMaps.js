const rooms = {
      "southHub": {name: "the southern hub", desc: "southHub desc", neighbors: {
          "outward-front-left": "engineering",
          "outward-front-right": "storage",
          "outward-back-left": "physicsLab", 
          "outward-back-right": "bioLab",
          "north": "northHub",
          "south": "airlock",
        }
      },
      "airlock": {name: "the airlock", desc: "airlock desc", 
        neighbors: {
          "north": "southHub",
          "south": "space",
        }
      },
      "storage": {name: "storage", desc: "storage desc", 
        neighbors: {
          "spinward": "bioLab", 
          "antispinward": "engineering",
          "inward": "southHub"
        }
      },
      "engineering": {name: "engineering", desc: "engineering desc", neighbors: {
          "spinward": "storage", 
          "antispinward": "physicsLab",
          "inward": "southHub"
        }
      },
      "physicsLab": {name: "the physics lab", desc: "physicsLab desc", neighbors: {
          "spinward": "bioLab", 
          "antispinward": "engineering",
          "inward": "southHub"
        }
      },      
      "bioLab": {name: "the bio lab", desc: "bioLab desc", neighbors: {
          "spinward": "bioLab", 
          "antispinward": "engineering",
          "inward": "southHub"
        }
      },
      "northHub": {name: "the northern hub", desc: "northHub desc", neighbors: {
          "outward-front-left": "hydroponics",
          "outward-front-right": "head",
          "outward-back-left": "foodPrep", 
          "outward-back-right": "habitation",
          "south": "southHub",
          "north": "shuttleBay",
        }
      },
      "shuttleBay": {name: "the shuttle bay", desc: "shuttleBay desc", 
        neighbors: {
          "north": "space",
          "south": "northHub",
        }
      },
      "hydroponics": {name: "hydroponics", desc: "hydroponics desc", neighbors: {
          "spinward": "head", 
          "antispinward": "foodPrep",
          "inward": "northHub"
        }
      },
      "head": {name: "the head", desc: "head desc", neighbors: {
          "spinward": "habitation", 
          "antispinward": "hydroponics",
          "inward": "northHub"
        }
      },
      "habitation": {name: "habitation", desc: "habitation desc", neighbors: {
          "spinward": "foodPrep", 
          "antispinward": "head",
          "inward": "northHub"
        }
      },
      "foodPrep": {name: "the food prep area", desc: "foodPrep desc", neighbors: {
          "spinward": "hydroponics", 
          "antispinward": "habitation",
          "inward": "northHub"
        }
      },
    };

export default rooms;

export {rooms};