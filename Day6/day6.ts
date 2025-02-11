import * as fs from "fs"

function read_file(filename: string): Array<number> {
    return fs.readFileSync(filename, "utf8")
        .split(",")
        .map(num => parseInt(num, 10))
}

function part1(): number {
    let lanternfish: Array<number> = read_file("input.txt")
    let days: number = 80

    for (let i = 0; i < days; i++) {
        lanternfish.forEach(function (age: number, index: number, lanternfish: Array<number>) {
            if (lanternfish[index] == 0) {
                lanternfish[index] = 6
                lanternfish.push(8)
            } else {
                lanternfish[index] -= 1
            }
            
        })
    }

    return lanternfish.length
}

function part2(): number {
    let lanternfish: Array<number> = read_file("input.txt")
    let days: number = 256
    let age_dict: Map<number, number> = new Map<number, number>()

    for (let i = 0; i < 9; i++) {
        age_dict.set(i, 0)        
    }
    
    lanternfish.forEach(function (age: number) {
        age_dict.set(age, age_dict.get(age)!+1)
    })

    let new_lanternfish: number = 0

    for (let i = 0; i < days; i++) {
        new_lanternfish = age_dict.get(0)!
        for (let j = 0; j < 8; j++) {
            age_dict.set(j, age_dict.get(j+1)!)        
        }
        age_dict.set(6, age_dict.get(6)!+new_lanternfish)        
        age_dict.set(8, new_lanternfish)        
    }

    let total_number_of_lanternfish: number = 0
    age_dict.forEach(function (amount: number) {
        total_number_of_lanternfish += amount
    })

    return total_number_of_lanternfish
}

console.log(`part1(): ${part1()}`)
console.log(`part2(): ${part2()}`)