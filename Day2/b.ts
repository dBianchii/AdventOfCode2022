import {readFileSync} from 'fs'

const input = readFileSync('./Day2/input.txt', 'utf-8');

const guideArray = input.split('\r\n')

let totalPoints = 0
guideArray.forEach((line) => {
	let opponent = line.substring(0, 1)
	let myPlay = line.substring(2, 3)
	
	switch (opponent) {
		//Rock
		case 'A':
			//Lose -> Scissors
			if (myPlay == 'X')
				totalPoints += 3
			//Draw -> Rock
			if (myPlay == 'Y')
				totalPoints += 1
			//Win -> Paper
			if (myPlay == 'Z')
				totalPoints += 2
			break;
		//Paper
		case 'B':
			//Lose -> Rock
			if (myPlay == 'X')
				totalPoints += 1
			//Draw -> Paper
			if (myPlay == 'Y')
				totalPoints += 2
			//Win -> Scissors
			if (myPlay == 'Z')
				totalPoints += 3
			break;
		case 'C':
			//Lose -> Paper
			if (myPlay == 'X')
				totalPoints += 2
			//Draw -> Scissors
			if (myPlay == 'Y')
				totalPoints += 3
			if (myPlay == 'Z')
			//Win -> Rock
				totalPoints += 1
			break;

	}

	//switch for points if Lose, draw, Win
	switch (myPlay) {
		case 'Y':
			totalPoints += 3
			break;
		case 'Z':
			totalPoints += 6
			break;
	}
})
console.log(totalPoints);