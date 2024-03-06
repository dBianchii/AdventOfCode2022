import { readFileSync } from "fs";

const input = readFileSync("./Day15/input.txt", "utf-8");
let lines = input.split("\n");

const { smallestX, biggestX, smallestY, biggestY } =
  GetSmallestAndBiggestXsAndYs();

GenerateInitialMap();

function GetSmallestAndBiggestXsAndYs() {
  let smallestX = 0;
  let biggestX = 0;

  let smallestY = 0;
  let biggestY = 0;

  const regex = /(x|y)=(-?\d+)/g;

  for (const line of lines) {
    const match = line.match(regex);
    const coords = match
      ?.map((m) => {
        m = m.replace("x=", "");
        m = m.replace("y=", "");
        return m;
      })
      .map((string) => Number(string)) as number[];

    if (coords[0] < smallestX) smallestX = coords[0];
    if (coords[0] > biggestX) biggestX = coords[0];
    if (coords[1] < smallestY) smallestY = coords[1];
    if (coords[1] > biggestY) biggestY = coords[1];
    if (coords[2] < smallestX) smallestX = coords[2];
    if (coords[2] > biggestX) biggestX = coords[2];
    if (coords[3] < smallestY) smallestY = coords[3];
    if (coords[3] > biggestY) biggestY = coords[3];
  }

  return {
    smallestX,
    biggestX,
    smallestY,
    biggestY,
  };
}

function GenerateInitialMap() {
  let map = new Array<Array<string>>();
  for (let y = 0; y < biggestY - smallestY + 1; y++) {
    map.push(new Array<string>());
    for (let x = 0; x < biggestX - smallestX + 1; x++) {
      map[y].push(".");
    }
  }
}
