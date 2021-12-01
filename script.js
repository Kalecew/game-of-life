const fieldSize = 3
const rowsNumber = 150
const columnsNumber = 150
const backgroundColor = 'ghostwhite'
const fieldColor = 'lightsalmon'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const gameLife = new GameLife(rowsNumber,columnsNumber)

init()

function init(){
	canvas.width = fieldSize*columnsNumber
	canvas.height = fieldSize*rowsNumber
	clearCanvas()
	gameLife.reviveRandomFields(10000)
	drawFields()
	requestAnimationFrame(goGame)
}

function goGame(){
	clearCanvas()
	gameLife.changeGeneration()
	drawFields()
	requestAnimationFrame(goGame)
}

function clearCanvas(){
	context.fillStyle = backgroundColor
	context.beginPath()
	context.rect(0,0,canvas.width,canvas.height)
	context.fill()
}

function drawFields(){
	for (let y = 0; y < gameLife.rows; y++) {
		for (let x = 0; x < gameLife.columns; x++) {
			gameLife.getField(x,y) === true ? fillField(x,y,fieldColor) : fillField(x,y,backgroundColor)
		}
	}
}

function fillField(x,y,color){
	context.fillStyle = color
	context.beginPath()
	context.rect(x*fieldSize, y*fieldSize, fieldSize, fieldSize)
	context.fill()
}