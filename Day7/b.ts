import { readFileSync } from "fs"

const input = readFileSync("./Day7/input.txt", "utf-8")

let lines = input.split("\r\n")

class File {
	constructor(fileName: string, fileSize: number) {
		this.fileName = fileName
		this.fileSize = fileSize
	}
	fileName: string
	fileSize: number
}

class Directory {
	constructor(
		name: string,
		dirSize: number,
		parent: Directory | null,
		children: Directory[],
		files: File[]
	) {
		this.id = Math.floor(Math.random() * 1000000)
		this.name = name
		this.dirSize = dirSize
		this.parent = parent
		this.children = children
		this.files = files
	}
	id: number
	name: string
	dirSize: number
	parent: Directory | null
	children: Directory[]
	files: File[]
	isFile = false
	visited: boolean = false
}

const rootDir: Directory = new Directory("root", 0, null, [], [])
var currentDir: Directory | null = rootDir
lines.forEach((line) => {
	if (line.substring(0, 1) == "$") {
		//Command
		let command = line.substring(2, 4)
		switch (command) {
			case "cd":
				if (line.substring(5, 6) == "/") {
					// Go to root
					currentDir = rootDir
				} else if (line.substring(5, 7) == "..") {
					// Go back one
					if (currentDir?.parent != null) currentDir = currentDir.parent
				} else if (line.substring(5, 6).match(/[A-Za-z]/g)) {
					// Go to directory
					var gotoDir = currentDir?.children.find(
						(x) => x.name == line.substring(5, line.length)
					)
					if (gotoDir != null) currentDir = gotoDir
				} else {
					throw new Error("cd command not parsed correctly")
				}
				break
		}
	} else {
		//Listing Files
		if (line.substring(0, 3) == "dir") {
			//Is a directory
			const dir = new Directory(
				line.substring(4, line.length),
				0,
				currentDir,
				[],
				[]
			)
			if (!currentDir?.children.includes(dir)) {
				currentDir?.children.push(dir)
			}
		} else if (line.substring(0, 1).match(/[0-9]/gm)) {
			//Is a file
			const file = new Directory(
				line.split(" ")[1],
				Number(line.split(" ")[0]),
				currentDir,
				[],
				[]
			)
			file.isFile = true
			if (!currentDir?.children.includes(file)) {
				currentDir?.children.push(file)
			}
		}
	}
})

function getSize(node: Directory, directoryCallback: Function = () => {}) {
	if (node.isFile) {
		return node.dirSize
	}
	const dirSize: number = node.children
		.map((child) => getSize(child, directoryCallback))
		.reduce((a, b) => a + b, 0)

	directoryCallback(node, dirSize)
	node.dirSize = dirSize
	return dirSize
}
const totalDiskSpace = 70000000
const requiredSpace = 30000000
const usedSpace = getSize(rootDir)
const availableSpace = totalDiskSpace - usedSpace

if (availableSpace > requiredSpace) {
	throw new Error("There is already enough space")
}

const minimumFolderSize = requiredSpace - availableSpace

var candidates: Directory[] = []
getSize(rootDir, (node: Directory, size: number) => {
	console.log(node.name, size)

	if (size >= minimumFolderSize) {
		candidates.push(node)
	}
})

candidates.sort((a, b) => a.dirSize - b.dirSize)
console.log(candidates[0].dirSize)
