console.log('\x1b[7m Day 3, 2018 \x1b[0m')
const path = require('path')
const fs = require('fs')
const claims = fs.readFileSync(path.join(__dirname, '../inputs/3.txt')).toString().split('\n').map(claim => {
  let e = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/.exec(claim)
  return {
    id: +e[1],
    x: +e[2],
    y: +e[3],
    w: +e[4],
    h: +e[5]
  }
})
const start = Date.now()

let sqin = 0
let rect = {}
for (let claim of claims) {
  for (let x = claim.x; x < claim.x + claim.w; x++) {
    for (let y = claim.y; y < claim.y + claim.h; y++) {
      let pos = `${x},${y}`
      if (rect[pos] == null) rect[pos] = 1
      else rect[pos]++
      if (rect[pos] === 2) sqin++
    }
  }
}
console.log('Part 1: %s', sqin)

let outlier = claims.find(claim => {
  let isOutlier = 1
  for (let y = claim.y; y < claim.y + claim.h; y++) {
    for (let x = claim.x; x < claim.x + claim.w; x++) {
      isOutlier &= rect[`${x},${y}`] === 1
    }
  }
  return isOutlier
})
console.log('Part 2: %s', outlier.id)
console.log('(%sms)', Date.now() - start)
