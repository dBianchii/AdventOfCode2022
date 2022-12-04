import {readFileSync} from 'fs'

const input = readFileSync('./Day4/input.txt', 'utf-8');

let lines = input.split('\r\n')

let count = 0
lines.forEach((line) => {
	const [range1, range2] = line.split(",");
	const [start1, end1] = range1.split("-").map(Number);
	const [start2, end2] = range2.split("-").map(Number);

	if (start1 >= start2 && start1 <= end2 || end1 >= start2 && end1 <= end2 || start2 >= start1 && start2 <= end1 || end2 >= start1 && end2 <= end1){
		count++
	}
})
console.log(count);