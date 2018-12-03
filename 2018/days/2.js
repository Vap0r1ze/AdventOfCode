console.log('\x1b[7m Day 2, 2018 \x1b[0m')
const path = require('path')
const fs = require('fs')
const boxes = fs.readFileSync(path.join(__dirname, '../inputs/2.txt')).toString().split('\n')
const start = Date.now()

let common
let two = 0
let three = 0
for (let box of boxes) {
  let diff = Array(boxes.length).fill(0)
  let id = box.split('')
  two += id.some(letter => id.filter(l => l === letter).length === 2)
  three += id.some(letter => id.filter(l => l === letter).length === 3)
  for (let i = 0; i < box.length; i++) {
    for (let j = 0; j < boxes.length; j++) {
      if (box[i] !== boxes[j][i]) diff[j] += 1
    }
  }
  let boxCommon = boxes[diff.findIndex(d => d === 1)]
  if (boxCommon) {
    common = [ box, boxCommon ]
    break
  }
}
console.log('Part 1: %s', two * three)
let similar = [...common[0]].filter((c, i) => common[1][i] === c).join('')
console.log('Part 2: %s', similar)
console.log('(%sms)', Date.now() - start)