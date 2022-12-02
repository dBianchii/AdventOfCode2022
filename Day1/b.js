import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8').toString()

let elfCaloriesList = input.split("\r\n")

let currentArray = []
let arrayOfTopThreeElves = [0, 0, 0]

for (const line of elfCaloriesList) {
	if (line == ''){
		let currentArraySum = currentArray.reduce((partialSum, a) => partialSum + a, 0)

		if (currentArraySum > arrayOfTopThreeElves[0] || currentArraySum > arrayOfTopThreeElves[1] || currentArraySum > arrayOfTopThreeElves[2]){
			
			var indexOfLesserElf = arrayOfTopThreeElves.indexOf(Math.min(...arrayOfTopThreeElves));
			arrayOfTopThreeElves[indexOfLesserElf] = currentArraySum
		}
		currentArray = []
	} else {
		currentArray.push(Number(line))
	}
}

console.log(arrayOfTopThreeElves.reduce((partialSum, a) => partialSum + a, 0));
