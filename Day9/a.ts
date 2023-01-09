import { readFileSync } from "fs"

const input = readFileSync("./Day9/input.txt", "utf-8")

let lines = input.split("\r\n")

var map: string[][] = []

map[0] = []
map[0][0] = " "

var hPosX = 0
var hPosY = 0
var tPosX = 0
var tPosY = 0
lines.forEach((line, i) => {
	var direction = line.substring(0, 1)
	var distance = Number(line.split(" ")[1])
	MoveHead(direction, Number(distance))
})

function MoveHead(direction: string, distance: number) {
	var moveDir: number = 0
	var xMove = 0
	var yMove = 0

	if (direction == "L") {
		xMove = -1
	}
	if (direction == "R") {
		xMove = 1
	}
	if (direction == "U") {
		yMove = -1
	}
	if (direction == "D") {
		yMove = 1
	}

	for (var i = 0; i < distance; i++) {
		//Move one step
		hPosX += xMove
		hPosY += yMove
		if (map[hPosY] == undefined) {
			map[hPosY] = []
			for (let x in map[0]) {
				map[hPosY][x] = " "
			}
		}

		if (map[hPosY][hPosX] == undefined) {
			for (let y in map) {
				map[y][hPosX] = "H"
			}
		}
	}
}
console.table(map)
