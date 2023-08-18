import { readFileSync } from "fs";

const input = readFileSync("./Day14/input.txt", "utf-8");

let lines = input.split("\n");

const SAND = "O" as const;
const ROCK = "#" as const;
const AIR = "." as const;
const SANDSOURCE = "+" as const;

const sandSourceCoord = [500, 0];

const coords = lines.map((line) => {
  const matches = line.match(/\d+,\d+/g);
  if (matches) {
    return matches.map((coord) => {
      const [x, y] = coord.split(",").map(Number);
      return [x, y] as [number, number];
    });
  }
  return [];
});

const [maxX, maxY] = GetBiggestXAndY(coords);
const [minX, minY] = GetSmallestXAndY(coords);
let map = GenerateInitialMap(maxX, maxY);
GenerateRocks(map, coords);

let [sandX, sandY] = sandSourceCoord;
let finished = false;

NewGrainOfSand(map);
DisplayMap(map);
console.log(CountSand(map) - 2); //I remove two because I did not remove the last two sands from the map

function NewGrainOfSand(map: string[][]) {
  if (finished) {
    return;
  }
  [sandX, sandY] = sandSourceCoord;

  while (true) {
    if (map[sandY + 1] === undefined) {
      finished = true;
      break;
    }

    while (
      map[sandY + 1] !== undefined &&
      !IsCoordObstructed([sandX, sandY + 1])
    ) {
      MoveGrainOfSandDown(map);
    }

    if (
      map[sandY + 1] !== undefined &&
      !IsCoordObstructed([sandX - 1, sandY + 1])
    ) {
      MoveGrainOfSandDiagonallyLeft(map);
      continue;
    }

    if (
      map[sandY + 1] !== undefined &&
      !IsCoordObstructed([sandX + 1, sandY + 1])
    ) {
      MoveGrainOfSandDiagonallyRight(map);
      continue;
    }

    break;
  }
  NewGrainOfSand(map);
}

function MoveGrainOfSandDown(map: string[][]) {
  map[sandY][sandX] = AIR;
  sandY++;
  map[sandY][sandX] = SAND;
}

function MoveGrainOfSandDiagonallyLeft(map: string[][]) {
  map[sandY][sandX] = AIR;
  sandX--;
  sandY++;
  map[sandY][sandX] = SAND;
}

function MoveGrainOfSandDiagonallyRight(map: string[][]) {
  map[sandY][sandX] = AIR;
  sandX++;
  sandY++;
  map[sandY][sandX] = SAND;
}

function IsCoordObstructed(coord: [number, number]) {
  const OBSTRUCTIONS = [ROCK, SAND] as string[];

  const [x, y] = coord;
  if (OBSTRUCTIONS.includes(map[y][x])) return true;
  return false;
}

function DisplayMap(map: string[][]) {
  const rotatedMap = transposeMap(map);

  const output: string[] = [];

  rotatedMap.forEach((row) => {
    let rowOutput = "";
    row.forEach((char) => {
      if (char === SAND) {
        rowOutput += "\x1b[33m" + char + "\x1b[0m";
      } else if (char === ROCK) {
        rowOutput += "\x1b[31m" + char + "\x1b[0m";
      } else {
        rowOutput += char;
      }
    });
    output.push(rowOutput);
  });

  console.log(output.join("\n"));
}

// Transpose a 2D array (matrix)
function transposeMap(map: string[][]): string[][] {
  const rows = map.length;
  const cols = map[0].length;
  const transposedMap: string[][] = [];

  for (let j = 0; j < cols; j++) {
    transposedMap[j] = [];
    for (let i = 0; i < rows; i++) {
      transposedMap[j][i] = map[i][j];
    }
  }

  return transposedMap;
}

function GenerateRocks(map: string[][], coords: [number, number][][]) {
  coords.forEach((rockPath) => {
    for (let i = 0; i < rockPath.length - 1; i++) {
      DrawLineOfRocks(rockPath[i], rockPath[i + 1]);
    }
  });
  DisplayMap(map);
}

function DrawLineOfRocks(coord1: [number, number], coord2: [number, number]) {
  const [x1, y1] = coord1;
  const [x2, y2] = coord2;
  if (x1 === x2) {
    //vertical
    const greaterY = y1 > y2 ? y1 : y2;
    const lesserY = y1 < y2 ? y1 : y2;
    for (let i = lesserY; i <= greaterY; i++) {
      map[i][x1] = ROCK;
    }
  } else {
    //horizontal
    const greaterX = x1 > x2 ? x1 : x2;
    const lesserX = x1 < x2 ? x1 : x2;
    for (let i = lesserX; i <= greaterX; i++) {
      map[y1][i] = ROCK;
    }
  }
}

function GenerateInitialMap(maxX: number, maxY: number) {
  const map: string[][] = [];

  for (let i = 0; i <= maxY; i++) {
    map.push([]);
    for (let j = 0; j <= maxX; j++) {
      if (i === sandSourceCoord[1] && j === sandSourceCoord[0]) {
        map[i].push(SANDSOURCE);
      } else {
        map[i].push(AIR);
      }
    }
  }
  return map;
}

function GetBiggestXAndY(coords: [number, number][][]) {
  let maxX = sandSourceCoord[0];
  let maxY = sandSourceCoord[1];
  coords.forEach((coord) => {
    coord.forEach((coord) => {
      if (coord[0] > maxX) {
        maxX = coord[0];
      }
      if (coord[1] > maxY) {
        maxY = coord[1];
      }
    });
  });
  return [maxX, maxY];
}

function GetSmallestXAndY(coords: [number, number][][]) {
  let minX = Infinity;
  let minY = Infinity;
  coords.forEach((coord) => {
    coord.forEach((coord) => {
      if (coord[0] < minX) {
        minX = coord[0];
      }
      if (coord[1] < minY) {
        minY = coord[1];
      }
    });
  });
  //simplify below with math.min and math.max:
  return [
    minX > sandSourceCoord[0] ? sandSourceCoord[0] : minX,
    minY > sandSourceCoord[1] ? sandSourceCoord[1] : minY,
  ];
}

function CountSand(map: string[][]) {
  let count = 0;
  map.forEach((row) => {
    row.forEach((char) => {
      if (char === SAND) {
        count++;
      }
    });
  });
  return count;
}
