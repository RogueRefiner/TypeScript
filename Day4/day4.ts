import * as fs from "fs"

function read_file(filename: string): [Array<number>, Array<Array<Array<number>>>] {
    let file: Array<string> = fs.readFileSync(filename, "utf8").split("\n")
    let bingoboards: Array<Array<Array<number>>> = []
    let bingoboard: Array<Array<number>> = []

    for(let i = 2; i < file.length; i++) {
        if (file[i] == ""){
            bingoboards.push(bingoboard)
            bingoboard = []
        } else {
            let parsed_numbers: Array<number> = file[i].split(" ").map(num => parseInt(num, 10)).filter(num => !Number.isNaN(num))
            bingoboard.push(parsed_numbers)
        }
    }
    bingoboards.push(bingoboard)
    let numbers: Array<number> = file[0].split(",").map(num => parseInt(num, 10))
    return [numbers, bingoboards]
}

function part1(): number {
    const [numbers, bingoboards]: [Array<number>, Array<Array<Array<number>>>] = read_file("input.txt");
    let found_placeholder: number = 1000

    for (const value of numbers) {
        for (const bingoboard of bingoboards) {
            for (const subboard of bingoboard) {
                const index: number = subboard.indexOf(value);
                if (index >= 0) {
                    subboard[index] = found_placeholder;

                    let count: number = 0;
                    for (let i = 0; i < bingoboard.length; i++) {
                        if (bingoboard[i][index] == found_placeholder) {
                            count += 1;
                        }
                    }

                    if (subboard.filter(x => x == found_placeholder).length == subboard.length || count == subboard.length) {
                        return bingoboard.flat().filter(x => x != found_placeholder).reduce((sum, current) => sum + current, 0) * value;
                    }
                }
            }
        }
    }
    return 0; 
}

function part2(): number {
    return 0; 
}


console.log(part1())
console.log(part2())