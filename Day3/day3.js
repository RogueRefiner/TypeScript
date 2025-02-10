"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function read_file(filename) {
    return fs.readFileSync(filename, "utf8").split("\n");
}
function part1() {
    var diagnostic_report = read_file("input.txt");
    var epsilon_rate = "";
    var gamma_rate = "";
    for (var i = 0; i < diagnostic_report[0].length; i++) {
        var zeros = count_zeros(diagnostic_report, i);
        // for (let j = 0; j < diagnostic_report.length; j++) {
        //     if (diagnostic_report[j][i] == "0"){
        //         zeros += 1
        //     }             
        // }
        if (zeros > diagnostic_report.length / 2) {
            gamma_rate += "0";
            epsilon_rate += "1";
        }
        else {
            gamma_rate += "1";
            epsilon_rate += "0";
        }
    }
    return parseInt(gamma_rate, 2) * parseInt(epsilon_rate, 2);
}
function part2() {
    var diagnostic_report = read_file("input.txt");
    // console.log(`diagnostic: ${diagnostic_report.length}`)
    var oxygen_generator_rating = find_oxygen_generator(diagnostic_report, 0);
    var co2_scrubber_rating = find_co2_scrubber_rating(diagnostic_report, 0);
    for (var i = 1; i < diagnostic_report[0].length; i++) {
        if (co2_scrubber_rating.length == 1 && oxygen_generator_rating.length == 1) {
            break;
        }
        if (co2_scrubber_rating.length > 1) {
            co2_scrubber_rating = find_co2_scrubber_rating(co2_scrubber_rating, i);
        }
        if (oxygen_generator_rating.length > 1) {
            oxygen_generator_rating = find_oxygen_generator(oxygen_generator_rating, i);
        }
    }
    // console.log(`diagnostic: ${diagnostic_report.length}, co2_scrubber: ${co2_scrubber_rating.length}, oxygen: ${oxygen_generator_rating.length}`)
    // console.log(`co2_scrubber[0]: ${co2_scrubber_rating[0]}, oxygen[0]: ${oxygen_generator_rating[0]}`)
    return parseInt(co2_scrubber_rating[0], 2) * parseInt(oxygen_generator_rating[0], 2);
}
function find_oxygen_generator(oxygen_generator_rating, index) {
    var zeros = count_zeros(oxygen_generator_rating, index);
    var output = [];
    for (var i = 0; i < oxygen_generator_rating.length; i++) {
        if (zeros == oxygen_generator_rating.length / 2) {
            if (oxygen_generator_rating[i][index] == "1") {
                output.push(oxygen_generator_rating[i]);
            }
        }
        else if (zeros > oxygen_generator_rating.length / 2) {
            if (oxygen_generator_rating[i][index] == "0") {
                output.push(oxygen_generator_rating[i]);
            }
        }
        else {
            if (oxygen_generator_rating[i][index] == "1") {
                output.push(oxygen_generator_rating[i]);
            }
        }
    }
    return output;
}
function find_co2_scrubber_rating(co2_scrubber_rating, index) {
    var zeros = count_zeros(co2_scrubber_rating, index);
    var output = [];
    for (var i = 0; i < co2_scrubber_rating.length; i++) {
        if (zeros == co2_scrubber_rating.length / 2) {
            if (co2_scrubber_rating[i][index] == "0") {
                output.push(co2_scrubber_rating[i]);
            }
        }
        else if (zeros < co2_scrubber_rating.length / 2) {
            if (co2_scrubber_rating[i][index] == "0") {
                output.push(co2_scrubber_rating[i]);
            }
        }
        else {
            if (co2_scrubber_rating[i][index] == "1") {
                output.push(co2_scrubber_rating[i]);
            }
        }
    }
    return output;
}
function count_zeros(input_array, index) {
    var zeros = 0;
    for (var j = 0; j < input_array.length; j++) {
        if (input_array[j][index] == "0") {
            zeros += 1;
        }
    }
    return zeros;
}
console.log(part1());
console.log(part2());
