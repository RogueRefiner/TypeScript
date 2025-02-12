"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function read_file(filename) {
    return fs.readFileSync(filename, "utf8").split("\n");
}
function part1() {
    var note_entries = read_file("input.txt");
    var number_of_relevant_output_values = 0;
    note_entries.forEach(function (single_note_entry) {
        var output_values = single_note_entry.split(" | ")[1].split(" ");
        output_values.forEach(function (single_output_value) {
            if (single_output_value.length == 2 || single_output_value.length == 3 || single_output_value.length == 4 || single_output_value.length == 7) {
                number_of_relevant_output_values += 1;
            }
        });
    });
    return number_of_relevant_output_values;
}
function part2() {
    var note_entries = read_file("input.txt");
    // let distinguishable_values: Map<number, number> = new Map([ 
    // length, value
    //     [2, 1],
    //     [4, 4],
    //     [3, 7],
    //     [7, 8]
    // ]);
    var sum_output_values = 0;
    note_entries.forEach(function (single_note_entry) {
        var _a = single_note_entry.split(" | "), _ = _a[0], right = _a[1];
        var output_value_as_string = "";
        var one_as_string_value = "";
        var four_as_string_value = "";
        single_note_entry.split(" ").forEach(function (value) {
            if (value.length == 2) {
                one_as_string_value = value;
            }
            else if (value.length == 4) {
                four_as_string_value = value;
            }
        });
        right.split(" ").forEach(function (value) {
            var one_set = new Set(one_as_string_value);
            var four_set = new Set(four_as_string_value);
            if (value.length == 2) {
                output_value_as_string += "1";
            }
            else if (value.length == 4) {
                output_value_as_string += "4";
            }
            else if (value.length == 3) {
                output_value_as_string += "7";
            }
            else if (value.length == 7) {
                output_value_as_string += "8";
            }
            else if (value.length == 5) {
                var value_to_determine_set_1 = new Set(value);
                var one_intersection = new Set(Array.from(one_set).filter(function (x) { return value_to_determine_set_1.has(x); }));
                var four_intersection = new Set(Array.from(four_set).filter(function (x) { return value_to_determine_set_1.has(x); }));
                if (one_intersection.size == 2) {
                    output_value_as_string += "3";
                }
                else if (four_intersection.size == 3) {
                    output_value_as_string += "5";
                }
                else {
                    output_value_as_string += "2";
                }
            }
            else if (value.length == 6) {
                var value_to_determine_set_2 = new Set(value);
                var one_intersection = new Set(Array.from(one_set).filter(function (x) { return value_to_determine_set_2.has(x); }));
                var four_intersection = new Set(Array.from(four_set).filter(function (x) { return value_to_determine_set_2.has(x); }));
                if (one_intersection.size == 1) {
                    output_value_as_string += "6";
                }
                else if (four_intersection.size == 4) {
                    output_value_as_string += "9";
                }
                else {
                    output_value_as_string += "0";
                }
            }
        });
        sum_output_values += parseInt(output_value_as_string, 10);
    });
    return sum_output_values;
}
console.log("part1(): ".concat(part1()));
console.log("part2(): ".concat(part2()));
