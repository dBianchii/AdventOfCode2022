import { readFileSync } from "fs";

const input = readFileSync("./Day13/input.txt", "utf-8");
let lines = input.split("\n");

const pairs = lines
  .map((line, i) => (i % 3 === 0 ? [line, lines[i + 1]] : null))
  .filter(Boolean) as Array<[string, string]>;

/* ------ MAIN ------ */

let correctOrderIndexes = new Array<number>();
let correctOrder = false;
let finished = false;
pairs.forEach((pair, i) => {
	const left = JSON.parse(pair[0]) as Array<number>;
	const right = JSON.parse(pair[1]) as Array<number>;

	correctOrder = false;
	finished = false;

	Compare(left, right)
	if (correctOrder)
		correctOrderIndexes.push(i + 1);
})

console.log(
	correctOrderIndexes.reduce((acc, curr) => acc + curr, 0)
);


/* ------ FUNCTIONS ------ */
function Compare(a: number | number[], b: number | number[]): void {
	if (finished) return;

	if (typeof a === "number" && typeof b === "number"){
		if (a < b){
			correctOrder = true;
			finished = true
		}
		else if (a > b) finished = true;

		return
	}

	if (Array.isArray(a) && Array.isArray(b)) {
		const biggestArrayLength = a.length > b.length ? a.length : b.length;
		for (let i = 0; i < biggestArrayLength; i++) {
			if (finished) return;

			if (a[i] === undefined) {
				correctOrder = true
				finished = true
				return;
			};

			if (b[i] === undefined) {
				finished = true
				return;
			};
			
      Compare(a[i], b[i]);
    }
		return
	}

	if (typeof a === "number") a = [a];
	if (typeof b === "number") b = [b];
	
	Compare(a, b);
}