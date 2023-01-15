import { readFileSync } from "fs"

const input = readFileSync("./Day10/input.txt", "utf-8")

let lines = input.split("\r\n")

var registerx = 1
var cycle = 0
var image: string[][] = []
for (let i = 0; i < 6; i++) {
	image[i] = []
	for (let j = 0; j < 40; j++) {
		image[i][j] = " "
	}
}
var currentPixel = 0
var currentLine = 0
RunProgram()
drawImage(image)

function RunProgram() {
	lines.forEach((line) => {
		var command = line.split(" ")[0]
		if (command == "addx") {
			//takes two cycles to complete
			var value = parseInt(line.split(" ")[1])

			for (let i = 0; i < 2; i++) {
				if (i == 1) {
					AddToCycle(1)
					registerx += value
					break
				}
				AddToCycle(1)
			}
		} else if (command == "noop") {
			//takes one cycle to complete

			AddToCycle(1)
		} else throw new Error("Unknown command: " + command)
	})
}

function AddToCycle(amount: number) {
	cycle += amount
	addPixel()
}

function addPixel() {
	var pixel: "#" | "."
	if (
		currentPixel == registerx - 1 ||
		currentPixel == registerx ||
		currentPixel == registerx + 1
	)
		pixel = "#"
	else pixel = "."

	image[currentLine][currentPixel] = pixel
	currentPixel++

	if (currentPixel == 40) {
		currentPixel = 0
		currentLine++
		if (currentLine == 6) currentLine = 0
	}
}

function drawImage(image: string[][]) {
	var line: string = ""
	for (let i = 0; i < image.length; i++) {
		line = ""
		for (let j = 0; j < image[i].length; j++) {
			line += image[i][j]
		}
		console.log(line)
	}
}
