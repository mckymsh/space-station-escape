const rooms = {
      "southHub": {name: "the southern hub", desc: "southHub desc", 
      neighbors: [
          {key: "engineering", direction: "left", },
          {key: "storage", direction: "front",},
          {key: "physicsLab", direction: "back",}, 
          {key: "bioLab", direction: "right",},
          {key: "northHub", direction: "north",},
          {key: "airlock", direction: "south",},
        ]
      },
      "airlock": {name: "the airlock", desc: "airlock desc", 
        neighbors: [
          {key: "southHub", direction: "north"},
          {key: "space", direction: "south"},
        ]
      },
      "storage": {name: "storage", desc: "storage desc", 
        neighbors: [
          {key: "bioLab", direction: "spinward"},
          {key: "engineering", direction: "antispinward"},
          {key: "southHub", direction: "inward"},
        ]
      },
      "engineering": {name: "engineering", desc: "engineering desc", 
        neighbors: [
          {key: "storage", direction: "spinward"},
          {key: "physicsLab", direction: "antispinward"},
          {key: "southHub", direction: "inward"},
        ]
      },
      "physicsLab": {name: "the physics lab", desc: "physicsLab desc", 
        neighbors: [
          {key: "engineering", direction: "spinward"},
          {key: "bioLab", direction: "antispinward"},
          {key: "southHub", direction: "inward"},
        ]
      },      
      "bioLab": {name: "the bio lab", desc: "bioLab desc", 
        neighbors: [
          {key: "physicsLab", direction: "spinward"}, 
          {key: "storage", direction: "antispinward"},
          {key: "southHub", direction: "inward"},
        ]
      },
      "northHub": {name: "the northern hub", desc: "northHub desc", 
        neighbors: [
          {key: "hydroponics", direction: "left"},
          {key: "head", direction: "front"},
          {key: "foodPrep", direction: "back"}, 
          {key: "habitation", direction: "right"},
          {key: "southHub", direction: "south"},
          {key: "shuttleBay", direction: "north"},
        ]
      },
      "shuttleBay": {name: "the shuttle bay", desc: "shuttleBay desc", 
        neighbors: [
          {key: "space", direction: "north"},
          {key: "northHub", direction: "south"},
        ]
      },
      "space": {name: "space", desc: "You're probably dead. Apparently that doesn't slow you down.", 
        neighbors: [
          {key: "northHub", direction: "south"},
          {key: "southHub", direction: "north"},
        ]
      },
      "hydroponics": {name: "hydroponics", desc: "hydroponics desc", 
        neighbors: [
          {key: "head", direction: "spinward"}, 
          {key: "foodPrep", direction: "antispinward"},
          {key: "northHub", direction: "inward"},
        ]
      },
      "head": {name: "the head", desc: "head desc", 
        neighbors: [
          {key: "habitation", direction: "spinward"}, 
          {key: "hydroponics", direction: "antispinward"},
          {key: "northHub", direction: "inward"},
        ]
      },
      "habitation": {name: "habitation", desc: "habitation desc", 
        neighbors: [
          {key: "foodPrep", direction: "spinward"}, 
          {key: "head", direction: "antispinward"},
          {key: "northHub", direction: "inward"},
        ]
      },
      "foodPrep": {name: "the food prep area", desc: "foodPrep desc", 
        neighbors: [
          {key: "hydroponics", direction: "spinward"}, 
          {key: "habitation", direction: "antispinward"},
          {key: "northHub", direction: "inward"},
        ]
      },
    };

export default rooms;

export {rooms};