import { readFileSync } from "fs"

const input = readFileSync("./Day8/input.txt", "utf-8")

let lines = input.split("\r\n")
const map = ParseMap(lines)
console.log(CalculateBestScenicScore(map))

function ParseMap(lines: string[]) {
	let map: number[][] = []
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i]
		let row: number[] = []
		for (let j = 0; j < line.length; j++) {
			row.push(Number(line[j]))
		}
		map.push(row)
	}
	return map
}

function CalculateBestScenicScore(map: number[][]) {
	let bestScore = 0
	for (let row = 0; row < map.length; row++) {
		for (let col = 0; col < map[row].length; col++) {
			if (row == 3 && col == 2) {
				console.log("test")
			}
			const treeScenicScore = CalculateScenicScore(map, row, col)
			if (treeScenicScore > bestScore) bestScore = treeScenicScore
		}
	}
	return bestScore
}

function CalculateScenicScore(
	map: number[][],
	row: number,
	col: number
): number {
	//Calculate the score 4 trees above the tree
	let currentTree = map[row][col]

	//For every direction
	var aboveScore = SearchInDirection(0, -1) //Up
	var belowScore = SearchInDirection(0, 1) //Down
	var rightScore = SearchInDirection(1, 0) //Right
	var leftScore = SearchInDirection(-1, 0) //Left

	function SearchInDirection(x: number, y: number) {
		var score = 0

		var rowSrch = row + y
		var colSrch = col + x

		while (true) {
			//Stop if it's the edge
			if (map[rowSrch] == undefined) break
			if (map[rowSrch][colSrch] == undefined) break

			var searchedTree = map[rowSrch][colSrch]

			if (searchedTree >= currentTree) {
				//Stop when a tree is bigger or the same size than the current. Add it to the score
				score++
				break
			}
			score++
			rowSrch += y
			colSrch += x
		}
		return score
	}

	return aboveScore * leftScore * rightScore * belowScore
}
