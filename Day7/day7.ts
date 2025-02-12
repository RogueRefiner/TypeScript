import * as fs from "fs"

function read_file(filename: string): Array<number> {
    return fs.readFileSync(filename, "utf8").split(",").map(num => parseInt(num, 10))
}

function get_unique_positions(max: number): Array<number> {
    let unique_positions: Array<number> = []
    for (let i = 0; i <= max; i++) {
        unique_positions.push(i)
    }
    return unique_positions
} 

function part1(): number {
    let positions: Array<number> = read_file("input.txt")
    let max: number = Math.max(...positions.map(num => num))
    let unique_positions: Array<number> = get_unique_positions(max)    

    let most_efficient_fuel_usage: number = Number.MAX_VALUE
    unique_positions.forEach(function (index: number) {
        let fuel_usage: number = 0
        positions.forEach(function (num: number) {
            fuel_usage += Math.abs((num - index))
        })
        if (fuel_usage < most_efficient_fuel_usage) {
            most_efficient_fuel_usage = fuel_usage
        }
    })
    return most_efficient_fuel_usage
}

function part2(): number {
    let positions: Array<number> = read_file("input.txt")
    let max: number = Math.max(...positions.map(num => num))
    let unique_positions: Array<number> = get_unique_positions(max)    

    let most_efficient_fuel_usage: number = Number.MAX_VALUE
    unique_positions.forEach(function (index: number) {
        let fuel_usage: number = 0
        positions.forEach(function (num: number) {
            let position_difference: number = Math.abs((num - index)) 
            let i: number = 0
            for (let j = 0; j <= position_difference; j++) {
                i += j
            }
            fuel_usage += i
        })
        if (fuel_usage < most_efficient_fuel_usage) {
            most_efficient_fuel_usage = fuel_usage
        }
    })
    return most_efficient_fuel_usage
}

console.log(`part1(): ${part1()}`)
console.log(`part2(): ${part2()}`)