import { readFileSync } from "fs";

const input = readFileSync("./Day13/input.txt", "utf-8");
type NestedArray = (number | NestedArray)[][];
const inputList = input
  .split("\n")
  .filter(Boolean)
  .map((line) => JSON.parse(line)) as (number | NestedArray)[][];

/* ------ MAIN ------ */

let hasNotChangedCurrentOrder = false;
let finished = false;

const dividerPackets = [[[2]], [[6]]] as any;
for (const packet of dividerPackets) {
  inputList.push(packet);
}

const sortedList = SortList(inputList);
//Now, get the decoder key
let packetZeroIndex = 0;
let packetOneIndex = 0;

sortedList.forEach((line, i) => {
  if (line === dividerPackets[0]) {
    packetZeroIndex = i + 1;
  }
  if (line === dividerPackets[1]) {
    packetOneIndex = i + 1;
  }
});

console.log(packetZeroIndex * packetOneIndex); //Answer!

/* ------ FUNCTIONS ------ */
function SortList(list: NestedArray) {
  let swappedOnceOrMore = false;
  do {
    swappedOnceOrMore = false;
    for (let i = 0; i < list.length; i++) {
      if (list[i + 1] === undefined) continue; // last element

      const left = list[i];
      const right = list[i + 1];

      hasNotChangedCurrentOrder = false;
      finished = false;

      Compare(left, right);
      if (hasNotChangedCurrentOrder) {
        list[i] = left;
        list[i + 1] = right;
      } else {
        list[i] = right;
        list[i + 1] = left;
        swappedOnceOrMore = true;
      }
    }
  } while (swappedOnceOrMore);

  return list;
}

function Compare(
  a: (number | NestedArray)[] | (number | NestedArray),
  b: (number | NestedArray)[] | (number | NestedArray)
): void {
  if (finished) return;

  if (typeof a === "number" && typeof b === "number") {
    if (a < b) {
      hasNotChangedCurrentOrder = true;
      finished = true;
    } else if (a > b) finished = true;

    return;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    const biggestArrayLength = a.length > b.length ? a.length : b.length;
    for (let i = 0; i < biggestArrayLength; i++) {
      if (finished) return;

      if (a[i] === undefined) {
        hasNotChangedCurrentOrder = true;
        finished = true;
        return;
      }

      if (b[i] === undefined) {
        finished = true;
        return;
      }

      Compare(a[i], b[i]);
    }
    return;
  }

  if (typeof a === "number") a = [a];
  if (typeof b === "number") b = [b];

  Compare(a, b);
}
