"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function read_file(filename) {
    var file = fs.readFileSync(filename, "utf8").split("\n");
    var bingoboards = [];
    var bingoboard = [];
    for (var i = 2; i < file.length; i++) {
        if (file[i] == "") {
            bingoboards.push(bingoboard);
            bingoboard = [];
        }
        else {
            var parsed_numbers = file[i].split(" ").map(function (num) { return parseInt(num, 10); }).filter(function (num) { return !Number.isNaN(num); });
            bingoboard.push(parsed_numbers);
        }
    }
    bingoboards.push(bingoboard);
    var numbers = file[0].split(",").map(function (num) { return parseInt(num, 10); });
    return [numbers, bingoboards];
}
function part1() {
    var _a = read_file("input.txt"), numbers = _a[0], bingoboards = _a[1];
    for (var _i = 0, numbers_1 = numbers; _i < numbers_1.length; _i++) {
        var value = numbers_1[_i];
        for (var _b = 0, bingoboards_1 = bingoboards; _b < bingoboards_1.length; _b++) {
            var bingoboard = bingoboards_1[_b];
            for (var _c = 0, bingoboard_1 = bingoboard; _c < bingoboard_1.length; _c++) {
                var subboard = bingoboard_1[_c];
                var index = subboard.indexOf(value);
                if (index >= 0) {
                    subboard[index] = 1000;
                    var count = 0;
                    for (var i = 0; i < bingoboard.length; i++) {
                        if (bingoboard[i][index] == 1000) {
                            count += 1;
                        }
                    }
                    if (subboard.filter(function (x) { return x == 1000; }).length == subboard.length || count == subboard.length) {
                        return bingoboard.flat().filter(function (x) { return x != 1000; }).reduce(function (sum, current) { return sum + current; }, 0) * value;
                    }
                }
            }
        }
    }
    return 0;
}
function part2() {
    return 0;
}
console.log(part1());
console.log(part2());
