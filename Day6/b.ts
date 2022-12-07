import {readFileSync} from 'fs'

const input = readFileSync('./Day6/input.txt', 'utf-8');

function getIndex (){
	for (let i = 0; i < input.length; i++) {
		var foundIndex = true
		if (i < 14)
			continue
		
		var combination = input.substring(i - 14, i)

		for (let j = 0; j < combination.length; j++) {
			const letter = combination[j];
			
			const comboWithoutLetter = combination.slice(j + 1)
			if (comboWithoutLetter.includes(letter))
				foundIndex = false
		}
		if (foundIndex)
			return i
	}
}

console.log(getIndex())



