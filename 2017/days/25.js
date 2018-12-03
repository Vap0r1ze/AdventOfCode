const path = require('path')
const fs = require('fs')
const blueprint = fs.readFileSync(path.join(__dirname, '../inputs/25.txt')).toString().split('\n')
const get = (str, exp) => str.match(exp).pop()

const states = {}
let state = get(blueprint[0], /state ([A-Z])/)
let steps = +get(blueprint[1], /\d+/)

for (let i = 3; i < blueprint.length; i += 2) {
  let s = get(blueprint[i], /state ([A-Z])/)
  let rules = []
  for (let rule = 0; rule < 2; rule++) {
    i++
    rules[rule] = {
      value: +get(blueprint[++i], /\d/),
      slot: get(blueprint[++i], /left|right/) === 'right' ? 1 : -1,
      state: get(blueprint[++i], /state ([A-Z])/)
    }
  }
  states[s] = rules
}

let tape = [ 0 ]
let cursor = 0

for (let i = 0; i < steps; i++) {
  if (tape[cursor] == null) {
    if (cursor < 0) {
      tape.unshift(0)
      cursor = 0
    } else {
      tape.push(0)
    }
  }
  rule = states[state][tape[cursor]]
  tape[cursor] = rule.value
  cursor += rule.slot
  state = rule.state
}

console.log('Part 1: %s', tape.filter(Boolean).length)
