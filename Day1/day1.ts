import * as fs from "fs"

function read_file(filename: string): Array<string> {
    return fs.readFileSync(filename, "utf8").split("\n")    
}

function part1(): number {
    const array: Array<string> = read_file("input.txt")
    let counter: number = 0
    
    for (let i = 1; i < array.length; i++) { 
        if (Number(array[i]) > Number(array[i - 1])) { 
            counter += 1;
        }
    }
    return counter
}

function part2(): number {
    const array: Array<string> = read_file("input.txt")
    let counter: number = 0
    let measurements: Array<number> = []

    for (let i = 0; i < array.length-2; i++) {
        measurements.push(Number(array[i])+Number(array[i+1])+Number(array[i+2]))
    }
    
    for (let i = 1; i < measurements.length; i++){
        if(measurements[i] > measurements[i - 1]) {
            counter += 1
        }
    }

    return counter
}

console.log(part1())
console.log(part2())
