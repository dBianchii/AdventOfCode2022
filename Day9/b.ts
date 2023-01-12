import { readFileSync } from "fs"

const input = readFileSync("./Day9/input.txt", "utf-8")

let lines = input.split("\r\n")

type Cell = {
	visitedBy9: boolean
	contains: Knot[]
}

class Knot {
	constructor(
		xPos: number,
		yPos: number,
		parent: Knot | null,
		is9: boolean = false,
		isH: boolean = false,
		identifier: string,
		child: Knot | null = null
	) {
		this.is9 = is9
		this.xPos = xPos
		this.yPos = yPos
		this.parent = parent
		this.child = child
		this.isH = isH
		this.identifier = identifier
	}
	isH: boolean = false
	is9: boolean = false
	identifier: string
	parent: Knot | null
	child: Knot | null
	xPos: number
	yPos: number
}

var map: Cell[][] = []
const H = new Knot(0, 0, null, false, true, "H")
const _1 = new Knot(0, 0, H, false, false, "1")
const _2 = new Knot(0, 0, _1, false, false, "2")
const _3 = new Knot(0, 0, _2, false, false, "3")
const _4 = new Knot(0, 0, _3, false, false, "4")
const _5 = new Knot(0, 0, _4, false, false, "5")
const _6 = new Knot(0, 0, _5, false, false, "6")
const _7 = new Knot(0, 0, _6, false, false, "7")
const _8 = new Knot(0, 0, _7, false, false, "8")
const _9 = new Knot(0, 0, _8, true, false, "9")
H.child = _1
_1.child = _2
_2.child = _3
_3.child = _4
_4.child = _5
_5.child = _6
_6.child = _7
_7.child = _8
_8.child = _9

map[0] = []
map[0][0] = {
	visitedBy9: true,
	contains: [H, _1, _2, _3, _4, _5, _6, _7, _8, _9],
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
		if (knot.isH) {
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
					visitedBy9: knot.is9 || map[knot.yPos][knot.xPos].visitedBy9,
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
