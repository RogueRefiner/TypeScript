"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
    var e_1, _a, e_2, _b, e_3, _c;
    var _d = __read(read_file("input.txt"), 2), numbers = _d[0], bingoboards = _d[1];
    var found_placeholder = 1000;
    try {
        for (var numbers_1 = __values(numbers), numbers_1_1 = numbers_1.next(); !numbers_1_1.done; numbers_1_1 = numbers_1.next()) {
            var value = numbers_1_1.value;
            try {
                for (var bingoboards_1 = (e_2 = void 0, __values(bingoboards)), bingoboards_1_1 = bingoboards_1.next(); !bingoboards_1_1.done; bingoboards_1_1 = bingoboards_1.next()) {
                    var bingoboard = bingoboards_1_1.value;
                    try {
                        for (var bingoboard_1 = (e_3 = void 0, __values(bingoboard)), bingoboard_1_1 = bingoboard_1.next(); !bingoboard_1_1.done; bingoboard_1_1 = bingoboard_1.next()) {
                            var subboard = bingoboard_1_1.value;
                            var index = subboard.indexOf(value);
                            if (index >= 0) {
                                subboard[index] = found_placeholder;
                                var count = 0;
                                for (var i = 0; i < bingoboard.length; i++) {
                                    if (bingoboard[i][index] == found_placeholder) {
                                        count += 1;
                                    }
                                }
                                if (subboard.filter(function (x) { return x == found_placeholder; }).length == subboard.length || count == subboard.length) {
                                    return bingoboard.flat().filter(function (x) { return x != found_placeholder; }).reduce(function (sum, current) { return sum + current; }, 0) * value;
                                }
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (bingoboard_1_1 && !bingoboard_1_1.done && (_c = bingoboard_1.return)) _c.call(bingoboard_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (bingoboards_1_1 && !bingoboards_1_1.done && (_b = bingoboards_1.return)) _b.call(bingoboards_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (numbers_1_1 && !numbers_1_1.done && (_a = numbers_1.return)) _a.call(numbers_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return 0;
}
function part2() {
    var e_4, _a, e_5, _b, e_6, _c;
    var _d = __read(read_file("input.txt"), 2), numbers = _d[0], bingoboards = _d[1];
    var found_placeholder = 1000;
    var finished_boards = new Set();
    try {
        for (var numbers_2 = __values(numbers), numbers_2_1 = numbers_2.next(); !numbers_2_1.done; numbers_2_1 = numbers_2.next()) {
            var value = numbers_2_1.value;
            var test = 0;
            try {
                for (var bingoboards_2 = (e_5 = void 0, __values(bingoboards)), bingoboards_2_1 = bingoboards_2.next(); !bingoboards_2_1.done; bingoboards_2_1 = bingoboards_2.next()) {
                    var bingoboard = bingoboards_2_1.value;
                    try {
                        for (var bingoboard_2 = (e_6 = void 0, __values(bingoboard)), bingoboard_2_1 = bingoboard_2.next(); !bingoboard_2_1.done; bingoboard_2_1 = bingoboard_2.next()) {
                            var subboard = bingoboard_2_1.value;
                            var index = subboard.indexOf(value);
                            if (index >= 0) {
                                subboard[index] = found_placeholder;
                                var count = 0;
                                for (var i = 0; i < bingoboard.length; i++) {
                                    if (bingoboard[i][index] == found_placeholder) {
                                        count += 1;
                                    }
                                }
                                if (subboard.filter(function (x) { return x == found_placeholder; }).length == subboard.length || count == subboard.length) {
                                    finished_boards.add(test);
                                    if (finished_boards.size == bingoboards.length) {
                                        return bingoboards[__spreadArray([], __read(finished_boards), false).pop()].flat().filter(function (x) { return x != found_placeholder; }).reduce(function (sum, current) { return sum + current; }, 0) * value;
                                    }
                                }
                            }
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (bingoboard_2_1 && !bingoboard_2_1.done && (_c = bingoboard_2.return)) _c.call(bingoboard_2);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                    test += 1;
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (bingoboards_2_1 && !bingoboards_2_1.done && (_b = bingoboards_2.return)) _b.call(bingoboards_2);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (numbers_2_1 && !numbers_2_1.done && (_a = numbers_2.return)) _a.call(numbers_2);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return 0;
}
console.log(part1());
console.log(part2());
