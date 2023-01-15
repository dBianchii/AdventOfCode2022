import { readFileSync } from "fs"

const input = readFileSync("./Day10/input.txt", "utf-8")

let lines = input.split("\r\n")

var registerx = 1
var cycle = 0
var cyclesToCheck: number[] = [20, 60, 100, 140, 180, 220]
var signalStrengthSum = 0

lines.forEach((line) => {
	var command = line.split(" ")[0]
	if (command == "addx") {
		//takes two cycles to complete
		var value = parseInt(line.split(" ")[1])

		for (let i = 0; i < 2; i++) {
			if (i == 1) {
				AddToCycleAndCheck(1)
				registerx += value
				break
			}
			AddToCycleAndCheck(1)
		}
	} else if (command == "noop") {
		//takes one cycle to complete

		AddToCycleAndCheck(1)
	} else throw new Error("Unknown command: " + command)
})

function AddToCycleAndCheck(amount: number) {
	cycle += amount
	if (cyclesToCheck.includes(cycle)) {
		signalStrengthSum += registerx * cycle
	}
}
console.log(signalStrengthSum)
