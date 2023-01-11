import { readFileSync } from "fs"

const input = readFileSync("./Day9/input.txt", "utf-8")

let lines = input.split("\r\n")

type Cell = {
	visitedByT: boolean
	contains: "H" | "T" | "Both" | null
}

var map: Cell[][] = []

map[0] = []
map[0][0] = {
	visitedByT: true,
	contains: "Both",
}
DisplayMap(map)
var hPosX = 0
var hPosY = 0
var tPosX = 0
var tPosY = 0
lines.forEach((line, i) => {
	var direction = line.substring(0, 1)
	var distance = Number(line.split(" ")[1])
	MoveHead(direction, Number(distance))
})

DisplayMap(map)
console.log(CountNumberOfCellsThatHasT(map))

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
		//Move head
		//Unset previous head position
		map[hPosY][hPosX] = {
			visitedByT: map[hPosY][hPosX].visitedByT,
			contains: map[hPosY][hPosX].contains == "T" ? "T" : null,
		}
		//Move
		hPosX += xMoveDir
		hPosY += yMoveDir

		//Generate grid arrays if out of bounds
		if (map[hPosY] == undefined) {
			map[hPosY] = []
			for (let x in map[0]) {
				map[hPosY][x] = {
					visitedByT: false,
					contains: null,
				}
			}
		}
		if (map[hPosY][hPosX] == undefined) {
			const indexes = Object.keys(map)
			indexes.forEach((y: string) => {
				map[Number(y)][hPosX] = {
					visitedByT: false,
					contains: null,
				}
			})
		}
		//Set new head position
		map[hPosY][hPosX] = {
			visitedByT: map[hPosY][hPosX].visitedByT,
			contains: map[hPosY][hPosX].contains == "T" ? "Both" : "H",
		}

		//Move tail
		//Find out tail's relative position to Head
		var tRelX = hPosX - tPosX
		var tRelY = hPosY - tPosY

		if (Math.abs(tRelX) > 1 || Math.abs(tRelY) > 1) {
			//Tail is more than 1 step away from head

			//Unset old tail position
			map[tPosY][tPosX] = {
				visitedByT: map[tPosY][tPosX].visitedByT,
				contains: map[tPosY][tPosX].contains == "H" ? "H" : null,
			}

			//Move tail towards head
			//Determine if it should move y or x
			if (Math.abs(tRelX) > Math.abs(tRelY)) {
				//Move x
				if (tRelX > 0) {
					tPosX = hPosX - 1
					tPosY = hPosY
				} else {
					tPosX = hPosX + 1
					tPosY = hPosY
				}
			} else {
				//Move y
				if (tRelY > 0) {
					tPosY = hPosY - 1
					tPosX = hPosX
				} else {
					tPosY = hPosY + 1
					tPosX = hPosX
				}
			}
			map[tPosY][tPosX] = {
				visitedByT: true,
				contains: map[tPosY][tPosX].contains == "H" ? "Both" : "T",
			}
		}
	}
}

function DisplayMap(map: Cell[][]) {
	console.log("\n")
	var indexes = Object.keys(map)
	indexes = indexes.sort((a, b) => Number(a) - Number(b))

	indexes.forEach((y: string, i) => {
		var line = i + 1 + " "
		const xIndexes = Object.keys(map[Number(y)])
		xIndexes.forEach((x: string) => {
			switch (map[Number(y)][Number(x)].contains) {
				case "H":
					line += "\x1b[35mH\x1b[0m"
					break
				case "T":
					line += "\x1b[32mT\x1b[0m"
					break
				case "Both":
					line += "\x1b[35mH\x1b[0m"
					break
				default:
					line += map[Number(y)][Number(x)].visitedByT
						? "\x1b[32mT\x1b[0m"
						: "-"
					break
			}
		})
		console.log(line)
	})
	console.log("\n")
}

function CountNumberOfCellsThatHasT(map: Cell[][]) {
	var count = 0
	var indexes = Object.keys(map)
	indexes.forEach((y: string) => {
		const xIndexes = Object.keys(map[Number(y)])
		xIndexes.forEach((x: string) => {
			if (map[Number(y)][Number(x)].visitedByT) {
				count++
			}
		})
	})
	return count
}
