import {readFileSync} from 'fs'
const input = readFileSync('./Day5/input.txt', 'utf-8');

let lines = input.split('\r\n')

var stacks: String[][] = [[],[],[],[],[],[],[],[],[]]

lines.forEach((line, i) =>{
	//Get the boxes
	if (i < 8){
		var substring = 0
		for (let j = 0; j < 9; j++) {
			const next3 = line.substring(substring, substring + 3)
			if (next3.match(/\[[A-Z]\]/g)){ // I am pretty sure this is the first time I have used a regex in my programming career
				stacks[j].push(next3)
			}
			substring += 4 //Adds the three places + 1 for next column
		}
	}

	//Move those boxes 👌📦
	if (i > 9){
		const words = line.split(' ')
		const moveAmount = parseInt(words[1]);
  		const fromColumn = parseInt(words[3]) - 1;
  		const toColumn = parseInt(words[5]) - 1;

		var CrateMover9001: String[] = [] // The unmuddening has made everything different. I present you, the crane array.
		for (let j = 0; j < moveAmount; j++) {
			let pickupOne = stacks[fromColumn].shift()
			if (pickupOne)
				CrateMover9001.push(pickupOne) 
		}
		CrateMover9001.reverse() // Its engines do a quickidy reflop that makes it reverse its order of the pickings.

		for (const crate of CrateMover9001) {
			stacks[toColumn].unshift(crate)
		}
	}
	
})

var boxedStrings = ""
var unboxedStrings = ""
for (let i = 0; i < stacks.length; i++) {
	boxedStrings += stacks[i][0]
	unboxedStrings += stacks[i][0].substring(1, 2)
}

console.log("Yer boxes are here! ", boxedStrings)
console.log("Here they are replaced with a pure string mate!", unboxedStrings)

