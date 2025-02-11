"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function read_file(filename) {
    return fs.readFileSync(filename, "utf8")
        .split(",")
        .map(function (num) { return parseInt(num, 10); });
}
function part1() {
    var lanternfish = read_file("input.txt");
    var days = 80;
    for (var i = 0; i < days; i++) {
        lanternfish.forEach(function (age, index, lanternfish) {
            if (lanternfish[index] == 0) {
                lanternfish[index] = 6;
                lanternfish.push(8);
            }
            else {
                lanternfish[index] -= 1;
            }
        });
    }
    return lanternfish.length;
}
function part2() {
    var lanternfish = read_file("input.txt");
    var days = 256;
    var age_dict = new Map();
    for (var i = 0; i < 9; i++) {
        age_dict.set(i, 0);
    }
    lanternfish.forEach(function (age) {
        age_dict.set(age, age_dict.get(age) + 1);
    });
    var new_lanternfish = 0;
    for (var i = 0; i < days; i++) {
        new_lanternfish = age_dict.get(0);
        for (var j = 0; j < 8; j++) {
            age_dict.set(j, age_dict.get(j + 1));
        }
        age_dict.set(6, age_dict.get(6) + new_lanternfish);
        age_dict.set(8, new_lanternfish);
    }
    var total_number_of_lanternfish = 0;
    age_dict.forEach(function (amount) {
        total_number_of_lanternfish += amount;
    });
    return total_number_of_lanternfish;
}
console.log("part1(): ".concat(part1()));
console.log("part2(): ".concat(part2()));
