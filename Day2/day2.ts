import * as fs from "fs"

function read_file(filename: string): Array<string> {
    return fs.readFileSync(filename, "utf8").split("\n")
}

function part1(): number {
    let horizontal: number = 0
    let depth: number = 0
    const input: Array<string> = read_file("input.txt") 
    
    for (let i = 0; i < input.length; i++){
        let instruction: Array<string> = input[i].split(" ")
        if (instruction[0] == "forward") {
            horizontal += +instruction[1]
        } else if (instruction[0] == "down") {
            depth += +instruction[1]
        } else {
            depth -= +instruction[1]
        }
    }
    
    return horizontal * depth
}

function part2(): number {
    let horizontal: number = 0
    let depth: number = 0
    let aim: number = 0
    const input: Array<string> = read_file("input.txt")

    for (let i = 0; i < input.length; i++) {
        let instruction: Array<string> = input[i].split(" ")
        if (instruction[0] == "forward") {
            horizontal += +instruction[1]
            depth += aim * +instruction[1]  
        } else if (instruction[0] == "down") {
            aim += +instruction[1]
        } else {
            aim -= +instruction[1]
        }
    }

    return horizontal * depth
}

console.log(part1())
console.log(part2())
