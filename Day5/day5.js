"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function read_file(filename) {
    var file = fs.readFileSync(filename, "utf8").split("\n");
    var vents = [];
    var max_x = 0;
    var max_y = 0;
    file.forEach(function (line) {
        var split_line = line.split(" -> ");
        var start_coordinate = [+split_line[0].split(",")[0], +split_line[0].split(",")[1]];
        var end_coordinate = [+split_line[1].split(",")[0], +split_line[1].split(",")[1]];
        if (start_coordinate[0] > max_x) {
            max_x = start_coordinate[0];
        }
        else if (end_coordinate[0] > max_x) {
            max_x = end_coordinate[0];
        }
        if (start_coordinate[1] > max_y) {
            max_y = start_coordinate[1];
        }
        else if (end_coordinate[1] > max_y) {
            max_y = end_coordinate[1];
        }
        vents.push([start_coordinate, end_coordinate]);
    });
    return [vents, max_x, max_y];
}
function initialize_grid(x, y) {
    return Array.from({ length: y + 1 }, function () { return Array.from({ length: x + 1 }, function () { return 0; }); });
}
function count_overlapping_vents(grid) {
    var result = 0;
    grid.forEach(function (subgrid) {
        result += subgrid.filter(function (n) { return n > 1; }).length;
    });
    return result;
}
function draw_horizontal_line(grid, x_diff, x, y) {
    if (x_diff > 0) {
        while (x_diff >= 0) {
            grid[y][x] += 1;
            x_diff--;
            x += 1;
        }
    }
    else if (x_diff < 0) {
        while (x_diff <= 0) {
            grid[y][x] += 1;
            x_diff++;
            x -= 1;
        }
    }
    return grid;
}
function draw_vertical_line(grid, y_diff, x, y) {
    if (y_diff > 0) {
        while (y_diff >= 0) {
            grid[y][x] += 1;
            y_diff--;
            y += 1;
        }
    }
    else if (y_diff < 0) {
        while (y_diff <= 0) {
            grid[y][x] += 1;
            y_diff++;
            y -= 1;
        }
    }
    return grid;
}
function draw_diagonal_line(grid, x_diff, y_diff, x, y) {
    if (x_diff < 0 && y_diff > 0) {
        while (x_diff <= 0 && y_diff >= 0) {
            grid[y][x] += 1;
            x_diff++;
            y_diff--;
            x -= 1;
            y += 1;
        }
    }
    else if (x_diff > 0 && y_diff < 0) {
        while (x_diff >= 0 && y_diff <= 0) {
            grid[y][x] += 1;
            x_diff--;
            y_diff++;
            x += 1;
            y -= 1;
        }
    }
    else if (x_diff > 0 && y_diff > 0) {
        while (x_diff >= 0 && y_diff >= 0) {
            grid[y][x] += 1;
            x_diff--;
            y_diff--;
            x += 1;
            y += 1;
        }
    }
    else if (x_diff < 0 && y_diff < 0) {
        while (x_diff <= 0 && y_diff <= 0) {
            grid[y][x] += 1;
            x_diff++;
            y_diff++;
            x -= 1;
            y -= 1;
        }
    }
    return grid;
}
function calculate_coordinate_differences(start, end) {
    var x_diff = end[0] - start[0];
    var y_diff = end[1] - start[1];
    return [x_diff, y_diff];
}
function part1() {
    var _a = read_file("input.txt"), vents = _a[0], max_x = _a[1], max_y = _a[2];
    var grid = initialize_grid(max_x, max_y);
    vents.forEach(function (vent) {
        var _a = calculate_coordinate_differences(vent[0], vent[1]), x_diff = _a[0], y_diff = _a[1];
        if (x_diff != 0 && y_diff == 0) {
            grid = draw_horizontal_line(grid, x_diff, vent[0][0], vent[0][1]);
        }
        else if (x_diff == 0 && y_diff != 0) {
            grid = draw_vertical_line(grid, y_diff, vent[0][0], vent[0][1]);
        }
    });
    return count_overlapping_vents(grid);
}
function part2() {
    var _a = read_file("input.txt"), vents = _a[0], max_x = _a[1], max_y = _a[2];
    var grid = initialize_grid(max_x, max_y);
    vents.forEach(function (vent) {
        var _a = calculate_coordinate_differences(vent[0], vent[1]), x_diff = _a[0], y_diff = _a[1];
        if (x_diff != 0 && y_diff == 0) {
            grid = draw_horizontal_line(grid, x_diff, vent[0][0], vent[0][1]);
        }
        else if (x_diff == 0 && y_diff != 0) {
            grid = draw_vertical_line(grid, y_diff, vent[0][0], vent[0][1]);
        }
        else if (x_diff != 0 && y_diff != 0) {
            grid = draw_diagonal_line(grid, x_diff, y_diff, vent[0][0], vent[0][1]);
        }
    });
    return count_overlapping_vents(grid);
}
console.log("part1(): ".concat(part1()));
console.log("part2(): ".concat(part2()));
