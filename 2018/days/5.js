console.log('\x1b[7m Day 5, 2018 \x1b[0m')
const path = require('path')
const fs = require('fs')
const polymer = fs.readFileSync(path.join(__dirname, '../inputs/5.txt')).toString() 

function react (polymer, reactions) {
  let changes
  while (changes !== 0) {
    changes = 0
    for (let i = 0; i < polymer.length - 1; i++) {
      let cur = [ polymer[i], polymer[i + 1] ]
      if (cur[0].toLowerCase() === cur[1].toLowerCase() && cur[0] !== cur[1]) {
        if (reactions && !reactions.includes(cur[0].toLowerCase())) reactions.push(cur[0].toLowerCase())
        polymer = polymer.slice(0, i) + polymer.slice(i + 2)
        i--
        changes++
      }
    }
  }
  return polymer
}

let reactions = []
let firstReaction = react(polymer,  reactions)
console.log(firstReaction.length)

let reactionsMagnitudes = reactions.map(unit => {
  let p = polymer.replace(new RegExp(unit, 'ig'), '')
  return react(p).length
})
console.log(Math.min(...reactionsMagnitudes))
