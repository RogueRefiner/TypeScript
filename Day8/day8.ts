import * as fs from "fs"

function read_file(filename: string): Array<string> {
    return fs.readFileSync(filename, "utf8").split("\n");
}

function part1(): number {
    let note_entries: Array<string>  = read_file("input.txt")
    let number_of_relevant_output_values: number = 0
    
    note_entries.forEach(function (single_note_entry: string) {
        let output_values = single_note_entry.split(" | ")[1].split(" ")
        output_values.forEach(function (single_output_value) {
            if (single_output_value.length == 2 || single_output_value.length == 3 || single_output_value.length == 4 || single_output_value.length == 7){
                number_of_relevant_output_values += 1
            }
        })
    })
    
    return number_of_relevant_output_values
}

function part2(): number {
    let note_entries: Array<string>  = read_file("input.txt")
    // let distinguishable_values: Map<number, number> = new Map([ 
    // length, value
    //     [2, 1],
    //     [4, 4],
    //     [3, 7],
    //     [7, 8]
    // ]);

    let sum_output_values: number = 0
    note_entries.forEach(function (single_note_entry) {

        let [_, right] = single_note_entry.split(" | ")
        let output_value_as_string: string = ""
        
        let one_as_string_value: string = ""
        let four_as_string_value: string = ""

        single_note_entry.split(" ").forEach(function (value: string) {
            if (value.length == 2) {
            one_as_string_value = value
        } else if (value.length == 4) {
            four_as_string_value = value
        }
        })

        right.split(" ").forEach(function (value: string) {
            let one_set: Set<string> = new Set(one_as_string_value)
            let four_set: Set<string> = new Set(four_as_string_value)
            
            if (value.length == 2){
                output_value_as_string += "1"
            } else if (value.length == 4) {
                output_value_as_string += "4"
            } else if (value.length == 3) {
                output_value_as_string += "7"
            } else if (value.length == 7) {
                output_value_as_string += "8"
            } else if (value.length == 5) {
                let value_to_determine_set: Set<string> = new Set(value)
                let one_intersection: Set<string> = new Set(Array.from(one_set).filter(x => value_to_determine_set.has(x)));
                let four_intersection: Set<string> = new Set(Array.from(four_set).filter(x => value_to_determine_set.has(x)));

                if (one_intersection.size == 2){
                    output_value_as_string += "3"
                } else if (four_intersection.size == 3) {
                    output_value_as_string += "5"
                } else {
                    output_value_as_string += "2"
                }
            } else if (value.length == 6) {
                let value_to_determine_set: Set<string> = new Set(value)
                let one_intersection: Set<string> = new Set(Array.from(one_set).filter(x => value_to_determine_set.has(x)));
                let four_intersection: Set<string> = new Set(Array.from(four_set).filter(x => value_to_determine_set.has(x)));

                if (one_intersection.size == 1){
                    output_value_as_string += "6"
                } else if (four_intersection.size == 4) {
                    output_value_as_string += "9"
                } else {
                    output_value_as_string += "0"
                }
            }
        })
        sum_output_values += parseInt(output_value_as_string, 10)
    })

    return sum_output_values
}

console.log(`part1(): ${part1()}`)
console.log(`part2(): ${part2()}`)