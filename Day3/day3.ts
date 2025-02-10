import * as fs from "fs"

function read_file(filename: string): Array<string> {
    return fs.readFileSync(filename, "utf8").split("\n")
}

function part1(): number {
    const diagnostic_report: Array<string> = read_file("input.txt")
    let epsilon_rate: string = ""
    let gamma_rate: string = ""
    
    for (let i = 0; i < diagnostic_report[0].length; i++){
        let zeros: number = count_zeros(diagnostic_report, i)

        if (zeros > diagnostic_report.length / 2) {
            gamma_rate += "0"
            epsilon_rate += "1"
        } else {
            gamma_rate += "1"
            epsilon_rate += "0"
        }   
    }

    return parseInt(gamma_rate, 2) * parseInt(epsilon_rate, 2)
}

function part2(): number {
    const diagnostic_report: Array<string> = read_file("input.txt")
    
    let oxygen_generator_rating: Array<string> = find_oxygen_generator(diagnostic_report, 0)
    let co2_scrubber_rating: Array<string> = find_co2_scrubber_rating(diagnostic_report, 0)

    for (let i = 1; i < diagnostic_report[0].length; i++){
        if (co2_scrubber_rating.length == 1 && oxygen_generator_rating.length == 1) {
            break
        }

        if (co2_scrubber_rating.length > 1) {
            co2_scrubber_rating = find_co2_scrubber_rating(co2_scrubber_rating, i)
        }

        if (oxygen_generator_rating.length > 1){
            oxygen_generator_rating = find_oxygen_generator(oxygen_generator_rating, i)
        }
    }

    return parseInt(co2_scrubber_rating[0], 2) * parseInt(oxygen_generator_rating[0], 2)
}

function find_oxygen_generator(oxygen_generator_rating: Array<string>, index: number): Array<string> {
    let zeros: number = count_zeros(oxygen_generator_rating, index)
    let output: Array<string> = []

    for (let i = 0; i < oxygen_generator_rating.length; i++){
        if (zeros == oxygen_generator_rating.length / 2) {
            if (oxygen_generator_rating[i][index] == "1") {
                output.push(oxygen_generator_rating[i])
            } 
        } else if (zeros > oxygen_generator_rating.length / 2) {
            if (oxygen_generator_rating[i][index] == "0") {
                output.push(oxygen_generator_rating[i])
            } 
        } else {
            if (oxygen_generator_rating[i][index] == "1") {
                output.push(oxygen_generator_rating[i])
            } 
        }
    }

    return output
}

function find_co2_scrubber_rating(co2_scrubber_rating: Array<string>, index: number): Array<string> {
    let zeros: number = count_zeros(co2_scrubber_rating, index)
    let output: Array<string> = []

    for (let i = 0; i < co2_scrubber_rating.length; i++) {
        if (zeros == co2_scrubber_rating.length / 2){
            if (co2_scrubber_rating[i][index] == "0"){
                output.push(co2_scrubber_rating[i])
            }
        } else if (zeros < co2_scrubber_rating.length / 2) {
            if (co2_scrubber_rating[i][index] == "0"){
                output.push(co2_scrubber_rating[i])
            }    
        } else {
            if (co2_scrubber_rating[i][index] == "1"){
                output.push(co2_scrubber_rating[i])
            }
        }
    }

    return output
}

function count_zeros(input_array: Array<string>, index: number): number {
    let zeros: number = 0

    for (let j = 0; j < input_array.length; j++){
        if (input_array[j][index] == "0") {
            zeros += 1
        }
    }

    return zeros
}

console.log(part1())
console.log(part2())