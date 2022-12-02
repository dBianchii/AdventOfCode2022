import {readFileSync} from 'fs'

const input = readFileSync('./Day2/input.txt', 'utf-8');

const guideArray = input.split('\r\n')

let totalPoints = 0
guideArray.forEach((line) => {
	let opponent = line.substring(0, 1)
	let myPlay = line.substring(2, 3)
	
	switch (myPlay) {
		case 'X':
			totalPoints += 1
			if (opponent == 'A')
				totalPoints += 3
			if (opponent == 'C')
				totalPoints += 6
			break;
		case 'Y':
			totalPoints += 2
			if (opponent == 'A')
				totalPoints += 6
			if (opponent == 'B')
				totalPoints += 3
			break;
		case 'Z':
			totalPoints += 3
			if (opponent == 'B')
				totalPoints += 6
			if (opponent == 'C')
				totalPoints += 3
		break;

	}
})
console.log(totalPoints);