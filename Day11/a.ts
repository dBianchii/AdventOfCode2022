class Monkey {
	constructor(
		id: number,
		items: number[],
		operation: string,
		testDivisibleBy: number,
		testTrueThrowMonkey: number,
		testFalseThrowMonkey: number
	) {
		this.id = id
		this.items = items
		this.operation = operation
		this.testDivisibleBy = testDivisibleBy
		this.testTrueThrowMonkey = testTrueThrowMonkey
		this.testFalseThrowMonkey = testFalseThrowMonkey
		this.timesInspectedItems = 0
	}
	id: number
	items: number[]
	operation: string
	testDivisibleBy: number
	testTrueThrowMonkey: number
	testFalseThrowMonkey: number
	timesInspectedItems: number
}

const Monkey0 = new Monkey(0, [72, 64, 51, 57, 93, 97, 68], "* 19", 17, 4, 7)
const Monkey1 = new Monkey(1, [62], "* 11", 3, 3, 2)
const Monkey2 = new Monkey(2, [57, 94, 69, 79, 72], "+ 6", 19, 0, 4)
const Monkey3 = new Monkey(3, [80, 64, 92, 93, 64, 56], "+ 5", 7, 2, 0)
const Monkey4 = new Monkey(4, [70, 88, 95, 99, 78, 72, 65, 94], "+ 7", 2, 7, 5)
const Monkey5 = new Monkey(5, [57, 95, 81, 61], "* old", 5, 1, 6)
const Monkey6 = new Monkey(6, [79, 99], "+ 2", 11, 3, 1)
const Monkey7 = new Monkey(7, [68, 98, 62], "+ 3", 13, 5, 6)
const monkeyArray = [
	Monkey0,
	Monkey1,
	Monkey2,
	Monkey3,
	Monkey4,
	Monkey5,
	Monkey6,
	Monkey7,
]

for (let i = 0; i < 20; i++) {
	DoRound()
}

monkeyArray.sort((a, b) => b.timesInspectedItems - a.timesInspectedItems)
console.log(
	monkeyArray[0].timesInspectedItems * monkeyArray[1].timesInspectedItems
)

function DoRound() {
	for (let i = 0; i < monkeyArray.length; i++) {
		const monkey = monkeyArray[i]
		if (!monkey.items) continue
		var itemLength = monkey.items.length

		for (let item of monkey.items) {
			var operatedItem = DoOperation(monkey, item)
			//make monkey bored
			//round down to nearest integer
			var boredItem = Math.floor(operatedItem / 3)
			var testResult = CheckIfBoredItemIsDivisibleByTest(monkey, boredItem)
			if (testResult) {
				monkeyArray[monkey.testTrueThrowMonkey].items.push(boredItem)
			} else {
				monkeyArray[monkey.testFalseThrowMonkey].items.push(boredItem)
			}
			monkey.timesInspectedItems++
		}
		monkey.items = []
	}
}

function DoOperation(monkey: Monkey, item: number) {
	switch (monkey.operation.split(" ")[0]) {
		case "+":
			var item =
				item +
				(monkey.operation.split(" ")[1] == "old"
					? item
					: Number(monkey.operation.split(" ")[1]))
			break
		case "*":
			var item =
				item *
				(monkey.operation.split(" ")[1] == "old"
					? item
					: Number(monkey.operation.split(" ")[1]))
			break
	}
	return item
}

function CheckIfBoredItemIsDivisibleByTest(monkey: Monkey, boredItem: number) {
	if (boredItem % monkey.testDivisibleBy == 0) {
		return true
	} else {
		return false
	}
}
