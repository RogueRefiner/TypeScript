"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function read_file(filename) {
    return fs.readFileSync(filename, "utf8").split(",").map(function (num) { return parseInt(num, 10); });
}
function get_unique_positions(max) {
    var unique_positions = [];
    for (var i = 0; i <= max; i++) {
        unique_positions.push(i);
    }
    return unique_positions;
}
function part1() {
    var positions = read_file("input.txt");
    var max = Math.max.apply(Math, positions.map(function (num) { return num; }));
    var unique_positions = get_unique_positions(max);
    var most_efficient_fuel_usage = Number.MAX_VALUE;
    unique_positions.forEach(function (index) {
        var sum = 0;
        positions.forEach(function (num) {
            sum += Math.abs((num - index));
        });
        if (sum < most_efficient_fuel_usage) {
            most_efficient_fuel_usage = sum;
        }
    });
    return most_efficient_fuel_usage;
}
function part2() {
    var positions = read_file("input.txt");
    var max = Math.max.apply(Math, positions.map(function (num) { return num; }));
    var unique_positions = get_unique_positions(max);
    var most_efficient_fuel_usage = Number.MAX_VALUE;
    unique_positions.forEach(function (index) {
        var sum = 0;
        positions.forEach(function (num) {
            var difference = Math.abs((num - index));
            var i = 0;
            for (var j = 0; j <= difference; j++) {
                i += j;
            }
            sum += i;
        });
        if (sum < most_efficient_fuel_usage) {
            most_efficient_fuel_usage = sum;
        }
    });
    return most_efficient_fuel_usage;
}
console.log("part1(): ".concat(part1()));
console.log("part2(): ".concat(part2()));
