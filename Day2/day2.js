"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function read_file(filename) {
    return fs.readFileSync(filename, "utf8").split("\n");
}
function part1() {
    var horizontal = 0;
    var depth = 0;
    var input = read_file("input.txt");
    for (var i = 0; i < input.length; i++) {
        var instruction = input[i].split(" ");
        if (instruction[0] == "forward") {
            horizontal += +instruction[1];
        }
        else if (instruction[0] == "down") {
            depth += +instruction[1];
        }
        else {
            depth -= +instruction[1];
        }
    }
    return horizontal * depth;
}
function part2() {
    var horizontal = 0;
    var depth = 0;
    var aim = 0;
    var input = read_file("input.txt");
    for (var i = 0; i < input.length; i++) {
        var instruction = input[i].split(" ");
        if (instruction[0] == "forward") {
            horizontal += +instruction[1];
            depth += aim * +instruction[1];
        }
        else if (instruction[0] == "down") {
            aim += +instruction[1];
        }
        else {
            aim -= +instruction[1];
        }
    }
    return horizontal * depth;
}
console.log(part1());
console.log(part2());
