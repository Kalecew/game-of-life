class GameLife{
	constructor(rows,columns){
		this.rows = rows
		this.columns = columns
		this.map = []
		for (let y = 0; y < this.rows; y++) {
			const row = []
			for (let x = 0; x < this.columns; x++) {
				row.push(false)
			}
			this.map.push(row)
		}		
	}
	getField(x,y){
		if(x<0 || x>=this.columns || y<0 || y>=this.rows) 
			return false
		return this.map[y][x]
	}
	setField(x,y,value){
		if(x<0 || x>=this.columns || y<0 || y>=this.rows) 
			return false
		return this.map[y][x] = value
	}
	reviveRandomFields(n=1){
		const freeFields = []
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.columns; x++) {
				freeFields.push({x,y})
			}
		}
		n = parseInt(n)
		n = Math.min(n, freeFields.length)
		while (n-- > 0) {
			const rand = Math.floor(Math.random() * freeFields.length)
			const {x,y} = freeFields.splice(rand,1)[0]
			this.setField(x,y,true)
		}
	}
	changeGeneration(){		
		const giveLifeFields = []
		const takeLifeFields = []
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.columns; x++) {
				if (this.getField(x,y) === false && this.neighborsCount(x,y) == 3){
					giveLifeFields.push({x,y})
				}else if (this.getField(x,y) === true && (this.neighborsCount(x,y) < 2 || this.neighborsCount(x,y) > 3)){
					takeLifeFields.push({x,y})
				}
			}
		}
		this.giveLife(giveLifeFields)
		this.takeLife(takeLifeFields)
	}
	neighborsCount(x,y){
		let count = 0

		// Оптимизация следующих операций
		// count += this.getField(x-1, y-1)
		// count += this.getField(x-1, y)
		// count += this.getField(x-1, y+1)
		// count += this.getField(x, y-1)
		// count += this.getField(x, y+1)
		// count += this.getField(x+1, y-1)
		// count += this.getField(x+1, y)
		// count += this.getField(x+1, y+1)
		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				if (dx==0 && dy==0){
					continue
				}   
				count += this.getField(x+dx, y+dy)
			}
		}		
		
		return count		
	}
	giveLife(fields){
		while (fields.length > 0) {
			const {x,y} = fields.shift()
			this.setField(x,y,true)
		}
	}
	takeLife(fields){
		while (fields.length > 0) {
			const {x,y} = fields.shift()
			this.setField(x,y,false)
		}
	}

}