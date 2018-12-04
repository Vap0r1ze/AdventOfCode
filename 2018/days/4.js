console.log('\x1b[7m Day 4, 2018 \x1b[0m')
const path = require('path')
const fs = require('fs')
const events = fs.readFileSync(path.join(__dirname, '../inputs/4.txt')).toString().split('\n').sort().map(event => {
  let [, time, action ] = /\[(\d+-\d+-\d+ \d+:\d+)\] (.+)/.exec(event)
  let shift = null
  let awake = +('wakes up' === action)
  if (action.startsWith('G')) shift = action.match(/\d+/)[0]
  return {
    time: new Date(time),
    shift,
    awake
  }
})
const start = Date.now()

let guardsSleep = {}
let shift
let sleptAt
for (let event of events) {
  if (event.shift) {
    shift = event.shift
  } else {
    if (event.awake) {
      if (!guardsSleep[shift]) guardsSleep[shift] = { total: 0, minutes: {} }
      guardsSleep[shift].total += (event.time - sleptAt) / 60000
      let guardMinutes = guardsSleep[shift].minutes
      for (let time = sleptAt; time < event.time; time = new Date(+time + 60000)) {
        let minute = time.getMinutes()
        if (!guardMinutes[minute]) guardMinutes[minute] = 1
        else guardMinutes[minute]++
      }
    } else {
      sleptAt = event.time
    }
  }
}
let maxSleepTotal = Math.max(...Object.values(guardsSleep).map(sleep => sleep.total))
let maxSleepGuard = Object.keys(guardsSleep).find(guard => guardsSleep[guard].total === maxSleepTotal)
let maxSleepGuardMinutes = guardsSleep[maxSleepGuard].minutes
let maxSleepGuardmaxMinuteTotal = Math.max(...Object.values(maxSleepGuardMinutes))
let maxSleepGuardmaxMinute = Object.keys(maxSleepGuardMinutes).find(minute => maxSleepGuardMinutes[minute] === maxSleepGuardmaxMinuteTotal)
console.log('Part 1: %s', maxSleepGuard * maxSleepGuardmaxMinute)

let maxMinuteTotal = Math.max(...[].concat(...Object.values(guardsSleep).map(sleep => Object.values(sleep.minutes))))
let maxMinuteGuard = Object.keys(guardsSleep).find(guard => Object.values(guardsSleep[guard].minutes).includes(maxMinuteTotal))
let maxMinute = Object.keys(guardsSleep[maxMinuteGuard].minutes).find(minute => guardsSleep[maxMinuteGuard].minutes[minute] === maxMinuteTotal)
console.log('Part 2: %s', maxMinuteGuard * maxMinute)
console.log('(%sms)', Date.now() - start)
