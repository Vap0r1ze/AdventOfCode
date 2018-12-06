console.log('\x1b[7m Day 6, 2018 \x1b[0m')
const path = require('path')
const fs = require('fs')
const points = fs.readFileSync(path.join(__dirname, '../inputs/6.txt')).toString().split('\n').map(point => {
  let p = point.split(', ')
  return {
    x: +p[0],
    y: +p[1]
  }
})
const manhattan = (mx, my, px, py) => Math.abs(mx - px) + Math.abs(my - py)
const start = Date.now()

let xs = points.map(point => point.x)
let ys = points.map(point => point.y)
let gridPos = {
  l: Math.min(...xs) - 1,
  t: Math.min(...ys) - 1,
  r: Math.max(...xs) + 1,
  b: Math.max(...ys) + 1
}
let grid = {}

console.log(gridPos)
for (let x = gridPos.l; x <= gridPos.r; x++) {
  for (let y = gridPos.t; y <= gridPos.b; y++) {
    let distances = points.map(point => manhattan(x, y, point.x, point.y))
    let closestDist = Math.min(...distances)
    let matches = points.filter((point, i) => i === distances.indexOf(closestDist))
    if (matches.length === 1) grid[`${x},${y}`] = matches[0]
  }
}
console.log(grid)
let possibilities = [...points]
let exp = new RegExp(`${}`)
for (let pos of Object.keys(grid)) {
  if ()
}

console.log('(%sms)', Date.now() - start)
