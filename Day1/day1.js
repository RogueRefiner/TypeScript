"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function read_file(filename) {
    return fs.readFileSync(filename, "utf8").split("\n");
}
function part1() {
    var array = read_file("input.txt");
    var counter = 0;
    for (var i = 1; i < array.length; i++) {
        if (Number(array[i]) > Number(array[i - 1])) {
            counter += 1;
        }
    }
    return counter;
}
function part2() {
    var array = read_file("input.txt");
    var counter = 0;
    var measurements = [];
    for (var i = 0; i < array.length - 2; i++) {
        measurements.push(Number(array[i]) + Number(array[i + 1]) + Number(array[i + 2]));
    }
    for (var i = 1; i < measurements.length; i++) {
        if (measurements[i] > measurements[i - 1]) {
            counter += 1;
        }
    }
    return counter;
}
console.log(part1());
console.log(part2());
