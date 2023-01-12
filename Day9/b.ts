import { readFileSync } from "fs"

const input = readFileSync("./Day9/input.txt", "utf-8")

let lines = input.split("\r\n")

class Knot {
	constructor(
		xPos: number,
		yPos: number,
		parent: Knot | null,
		identifier: string,
		child: Knot | null = null
	) {
		this.xPos = xPos
		this.yPos = yPos
		this.parent = parent
		this.child = child
		this.identifier = identifier
	}
	identifier: string
	parent: Knot | null
	child: Knot | null
	xPos: number
	yPos: number
}

const H = new Knot(0, 0, null, "H")
var contains: Knot[] = []
contains.push(H)

var lastKnot = H

var numberOfKnots = 9 //Change this number to get more or less knots on your rope! 👌 (may not work for values bigger than 9)
for (let i = 1; i <= numberOfKnots; i++) {
	var newKnot = new Knot(0, 0, lastKnot, i.toString())
	contains.push(newKnot)
	lastKnot.child = newKnot
	lastKnot = newKnot
}

type Cell = {
	visitedBy9: boolean
	contains: Knot[]
}
var map: Cell[][] = []

map[0] = []
map[0][0] = {
	visitedBy9: true,
	contains,
}

lines.forEach((line, i) => {
	var direction = line.substring(0, 1)
	var distance = Number(line.split(" ")[1])
	MoveHead(direction, Number(distance))
})

DisplayMap(map)
console.log(CountNumberOfCellsThatHas9(map))

function MoveHead(direction: string, distance: number) {
	var xMoveDir = 0
	var yMoveDir = 0

	if (direction == "L") {
		xMoveDir = -1
	}
	if (direction == "R") {
		xMoveDir = 1
	}
	if (direction == "U") {
		yMoveDir = -1
	}
	if (direction == "D") {
		yMoveDir = 1
	}

	for (var i = 0; i < distance; i++) {
		//Move all tails recursively
		MoveAllKnots(H)
	}

	function MoveAllKnots(knot: Knot) {
		//Move head
		if (knot.identifier == "H") {
			//Move head
			//Unset previous head position
			map[knot.yPos][knot.xPos] = {
				visitedBy9: map[knot.yPos][knot.xPos].visitedBy9,
				contains: map[knot.yPos][knot.xPos].contains.filter((k) => k != knot),
			}
			//Move
			knot.xPos += xMoveDir
			knot.yPos += yMoveDir
			//Generate grid arrays if out of bounds
			if (map[knot.yPos] == undefined) {
				map[knot.yPos] = []
				for (let x in map[0]) {
					map[knot.yPos][x] = {
						visitedBy9: false,
						contains: [],
					}
				}
			}
			if (map[knot.yPos][knot.xPos] == undefined) {
				const indexes = Object.keys(map)
				indexes.forEach((y: string) => {
					map[Number(y)][knot.xPos] = {
						visitedBy9: false,
						contains: [],
					}
				})
			}

			//Set new head position
			map[knot.yPos][knot.xPos] = {
				visitedBy9: map[knot.yPos][knot.xPos].visitedBy9,
				contains: map[knot.yPos][knot.xPos].contains.concat(knot),
			}
		} else {
			//Find out knot's relative position to H
			if (!knot.parent) return

			var kRelX = knot.parent.xPos - knot.xPos
			var kRelY = knot.parent.yPos - knot.yPos

			if (Math.abs(kRelX) > 1 || Math.abs(kRelY) > 1) {
				//Child is more than 1 taxicab step away from knot
				//Unset old child position
				map[knot.yPos][knot.xPos] = {
					visitedBy9: map[knot.yPos][knot.xPos].visitedBy9,
					contains: map[knot.yPos][knot.xPos].contains.filter((k) => k != knot),
				}

				if (Math.abs(kRelX) + Math.abs(kRelY) >= 4) {
					//Child is more than 4 taxicab steps away from parent
					//Child should be diagonally 2 taxicab steps away from parent
					knot.xPos = knot.parent.xPos + (kRelX > 0 ? -1 : 1)
					knot.yPos = knot.parent.yPos + (kRelY > 0 ? -1 : 1)
				} else {
					//Child is 3 taxicab steps away from parent
					//Child should be 1 taxicab step away from parent
					if (Math.abs(kRelX) > Math.abs(kRelY)) {
						knot.xPos = knot.parent.xPos + (kRelX > 0 ? -1 : 1)
						knot.yPos = knot.parent.yPos
					} else {
						knot.xPos = knot.parent.xPos
						knot.yPos = knot.parent.yPos + (kRelY > 0 ? -1 : 1)
					}
				}

				//Child should be 1 step away from knot
				//Determine

				//Set new child position
				map[knot.yPos][knot.xPos] = {
					visitedBy9:
						knot.identifier == "9" || map[knot.yPos][knot.xPos].visitedBy9,
					contains: map[knot.yPos][knot.xPos].contains.concat(knot),
				}
			}
		}
		if (knot.child) MoveAllKnots(knot.child)
	}
}

function DisplayMap(map: Cell[][]) {
	console.log("\n")
	var indexes = Object.keys(map)
	indexes = indexes.sort((a, b) => Number(a) - Number(b))

	indexes.forEach((y: string, i) => {
		var line = i + 1 + " "
		const xIndexes = Object.keys(map[Number(y)])
		xIndexes.sort((a, b) => Number(a) - Number(b))
		xIndexes.forEach((x: string) => {
			var knotArray = map[Number(y)][Number(x)].contains

			if (knotArray.includes(H)) {
				line += "\x1b[35mH\x1b[0m"
			} else if (knotArray.length > 0) {
				var smallestKnotInArray = knotArray.reduce((a, b) =>
					a.identifier < b.identifier ? a : b
				)
				line += "\x1b[32m" + smallestKnotInArray.identifier + "\x1b[0m"
			} else if (map[Number(y)][Number(x)].visitedBy9 == true) {
				line += "\x1b[32m9\x1b[0m"
			} else {
				line += "."
			}
		})
		console.log(line)
	})
	console.log("\n")
}

function CountNumberOfCellsThatHas9(map: Cell[][]) {
	var count = 0
	var indexes = Object.keys(map)
	indexes = indexes.sort((a, b) => Number(a) - Number(b))
	indexes.forEach((y: string) => {
		var xIndexes = Object.keys(map[Number(y)])
		xIndexes = xIndexes.sort((a, b) => Number(a) - Number(b))
		xIndexes.forEach((x: string) => {
			if (map[Number(y)][Number(x)].visitedBy9) count++
		})
	})
	return count
}
