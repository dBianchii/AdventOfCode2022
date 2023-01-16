export default class Monkey {
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
