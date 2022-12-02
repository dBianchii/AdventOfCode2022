import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8').toString()

let elfCaloriesList = input.split("\r\n")

let currentArray = []
let maxCals = 0
for (const line of elfCaloriesList) {
	if (line == ''){
		let currentArraySum = currentArray.reduce((partialSum, a) => partialSum + a, 0)

		if (currentArraySum > maxCals){
			maxCals = currentArraySum
		}
	
		currentArray = []
	} else {
		currentArray.push(Number(line))
	}
}

console.log(maxCals);
