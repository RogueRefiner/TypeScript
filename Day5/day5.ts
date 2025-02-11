import * as fs from "fs"

function read_file(filename: string): [Array<[[number, number], [number, number]]>, number, number] {
    let file: Array<string> = fs.readFileSync(filename, "utf8").split("\n")
    let vents: Array<[[number, number], [number, number]]> = []
    let max_x: number = 0
    let max_y: number = 0
    file.forEach(function (line: string){
        let split_line: Array<string> = line.split(" -> ")
        let start_coordinate: [number, number] = [+split_line[0].split(",")[0], +split_line[0].split(",")[1]]
        let end_coordinate: [number, number] = [+split_line[1].split(",")[0], +split_line[1].split(",")[1]]
        
        if (start_coordinate[0] > max_x) {
            max_x = start_coordinate[0]
        } else if (end_coordinate[0] > max_x) {
            max_x = end_coordinate[0]
        }

        if (start_coordinate[1] > max_y) {
            max_y = start_coordinate[1]
        } else if (end_coordinate[1] > max_y) {
            max_y = end_coordinate[1]
        }
        
        vents.push([start_coordinate, end_coordinate])
    })
    return [vents, max_x, max_y]
}

function initialize_grid(x: number, y: number): Array<Array<number>> {
    return Array.from(
        { length: y+1 }, 
        () => Array.from({ length: x+1 }, () => 0)
    );
}

function count_overlapping_vents(grid: Array<Array<number>>): number {
    let result: number = 0
    grid.forEach(function (subgrid: Array<number>) {
        result += subgrid.filter((n) => n > 1).length
    })
    return result
}

function draw_horizontal_line(grid: Array<Array<number>>, x_diff: number, x: number, y: number): Array<Array<number>> {
    if (x_diff > 0){
        while (x_diff >= 0) {
            grid[y][x] += 1
            x_diff--
            x += 1
        }
    } else if (x_diff < 0) {
        while (x_diff <= 0) {
            grid[y][x] += 1
            x_diff++
            x -= 1
        }
    }
    return grid
}

function draw_vertical_line(grid: Array<Array<number>>, y_diff: number, x: number, y: number): Array<Array<number>> {
    if (y_diff > 0) {
        while (y_diff >= 0) {
            grid[y][x] += 1
            y_diff--
            y += 1
        }
    } else if (y_diff < 0) {
        while (y_diff <= 0) {
            grid[y][x] += 1
            y_diff++
            y -= 1
        }
    }
    return grid
}

function draw_diagonal_line(grid: Array<Array<number>>, x_diff: number, y_diff: number, x: number, y: number): Array<Array<number>> {
    if (x_diff < 0 && y_diff > 0) {
        while (x_diff <= 0 && y_diff >= 0) {
            grid[y][x] += 1
            x_diff++
            y_diff--
            x -= 1
            y += 1
        }

    } else if (x_diff > 0 && y_diff < 0) {
        while (x_diff >= 0 && y_diff <= 0) {
            grid[y][x] += 1
            x_diff--
            y_diff++
            x += 1
            y -= 1
        }
    } else if (x_diff > 0 && y_diff > 0) {
        while (x_diff >= 0 && y_diff >= 0) {
            grid[y][x] += 1
            x_diff--
            y_diff--
            x += 1
            y += 1
        }
    } else if (x_diff < 0 && y_diff < 0) {
        while (x_diff <= 0 && y_diff <= 0) {
            grid[y][x] += 1
            x_diff++
            y_diff++
            x -= 1
            y -= 1
        }
    }
    return grid
}

function calculate_coordinate_differences(start: [number, number], end: [number, number]): [number, number] {
    let x_diff: number = end[0] - start[0]
    let y_diff: number = end[1] - start[1]
    return [x_diff, y_diff]
}

function part1(): number {
    const [vents, max_x, max_y] = read_file("input.txt")


    let grid: Array<Array<number>> = initialize_grid(max_x, max_y)
        
    vents.forEach(function (vent: [[number, number], [number, number]]) {
        let [x_diff, y_diff] = calculate_coordinate_differences(vent[0], vent[1])
        
        if (x_diff != 0 && y_diff == 0) {
            grid = draw_horizontal_line(grid, x_diff, vent[0][0], vent[0][1])
        } else if (x_diff == 0 && y_diff != 0) {
            grid = draw_vertical_line(grid, y_diff, vent[0][0], vent[0][1])
        }
    })
    
    return count_overlapping_vents(grid)    
}

function part2(): number {
    const [vents, max_x, max_y] = read_file("input.txt")

    let grid: Array<Array<number>> = initialize_grid(max_x, max_y)

    vents.forEach(function (vent: [[number, number], [number, number]]) {
        let [x_diff, y_diff] = calculate_coordinate_differences(vent[0], vent[1])
        
        if (x_diff != 0 && y_diff == 0) {
            grid = draw_horizontal_line(grid, x_diff, vent[0][0], vent[0][1])
        } else if (x_diff == 0 && y_diff != 0) {
            grid = draw_vertical_line(grid, y_diff, vent[0][0], vent[0][1])
        } else if (x_diff != 0 && y_diff != 0){
            grid = draw_diagonal_line(grid, x_diff, y_diff, vent[0][0], vent[0][1])
        }
    })
    
    return count_overlapping_vents(grid)
}

console.log(`part1(): ${part1()}`)
console.log(`part2(): ${part2()}`)