class Room{
	constructor(name, description, neighbors){
		this.name = name;
		this.description = description;
		this.neighbors = neighbors;
	}

	get name(){
		return this.name;
	}

	get description(){
		return this.description;
	}

	get neighbors(){
		return this.neighbors;
	}
}