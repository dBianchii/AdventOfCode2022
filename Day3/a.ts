import {readFileSync} from 'fs'

const input = readFileSync('./Day3/input.txt', 'utf-8');

const rucksacks = input.split('\r\n')

let letterMap = new Map<string, number>([
	["a", 1],
	["b", 2],
	["c", 3],
	["d", 4],
	["e", 5],
	["f", 6],
	["g", 7],
	["h", 8],
	["i", 9],
	["j", 10],
	["k", 11],
	["l", 12],
	["m", 13],
	["n", 14],
	["o", 15],
	["p", 16],
	["q", 17],
	["r", 18],
	["s", 19],
	["t", 20],
	["u", 21],
	["v", 22],
	["w", 23],
	["x", 24],
	["y", 25],
	["z", 26]]
);

let usedLetters: String[] = []
let prioritiesPoint: number = 0
rucksacks.forEach((line) =>{
	var lineCount = line.length
	var ruckasck1 = line.slice(0, lineCount / 2)
	var rucksack2 = line.slice(lineCount / 2, lineCount)

	for (const letter of ruckasck1) {
		if (usedLetters.includes(letter)){
			continue
		}
		if (rucksack2.includes(letter)){
			usedLetters.push(letter)
			let points = letterMap.get(letter.toLowerCase())
			prioritiesPoint += Number(points)
			if (letter == letter.toUpperCase()){
				prioritiesPoint += 26
			}
		}
	}
	usedLetters = []
})

console.log(prioritiesPoint);
