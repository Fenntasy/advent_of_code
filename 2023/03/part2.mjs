import { readFile} from "node:fs/promises"

const numberRegex = /([0-9]+)/g

readFile("input", "utf8").then(input => {
  const lines = input
    .split("\n")
    .slice(0, -1)

  const possibleGears = {};
  const gears = [];

  function addPossibleGear(coord, number) {
    console.log({coord, number})
    if (possibleGears[coord]) {
      gears.push(number * possibleGears[coord]);
    } else {
      possibleGears[coord] = number
    }
  }

  lines.forEach((line, vIndex) => {
    for (const numberResult of line.matchAll(numberRegex)) {
      const number = parseInt(numberResult[0], 10)
      const hIndex = numberResult.index
      const hLength = numberResult[0].length

      for (let i = hIndex - 1; i <= hIndex + hLength; i++) {
        if (vIndex > 0) {
          if (lines[vIndex - 1][i] === "*") {
            addPossibleGear(`${vIndex - 1},${i}`, number)
          }
        }
        if (vIndex < lines.length - 1) {
          if (lines[vIndex + 1][i] === "*") {
            addPossibleGear(`${vIndex + 1},${i}`, number)
          }
        }
      }
      if (line[hIndex - 1] === "*") {
        addPossibleGear(`${vIndex},${hIndex - 1}`, number)
      }
      if (line[hIndex + hLength] === "*") {
        addPossibleGear(`${vIndex},${hIndex + hLength}`, number)
      }
    }
  })

  return gears
}).then((result) => {
  console.log(result, result.reduce((a, b) => a + b, 0))
})
