console.log('\x1b[7m Day 1, 2018 \x1b[0m')
const path = require('path')
const fs = require('fs')
const input = fs.readFileSync(path.join(__dirname, '../inputs/1.txt')).toString().split('\n')
const start = Date.now()

let freq = 0
let list = [ freq ]
let hitTwice
while (hitTwice == null) {
  for (let n of input) {
    freq += +n
    if (list.includes(freq)) {
      hitTwice = freq
      if (list.length - 1 > input.length) break
    }
    list.push(freq)
  }
  if (list.length - 1 === input.length) console.log('Part 1: %s', freq)
}
console.log('Part 2: %s', hitTwice)
console.log('(%sms)', Date.now() - start)
