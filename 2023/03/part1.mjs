import { readFile} from "node:fs/promises"

const numberRegex = /([0-9]+)/g

readFile("input", "utf8").then(input => {
  const lines = input
    .split("\n")
    .slice(0, -1)

  const engineParts = [];

  lines.forEach((line, vIndex) => {
    for (const numberResult of line.matchAll(numberRegex)) {
      const number = parseInt(numberResult[0], 10)
      const hIndex = numberResult.index
      const hLength = numberResult[0].length

      const neighbours = [];
      for (let i = hIndex - 1; i <= hIndex + hLength; i++) {
        if (vIndex > 0) {
          neighbours.push(lines[vIndex - 1][i])
        }
        if (vIndex < lines.length - 1) {
          neighbours.push(lines[vIndex + 1][i])
        }
      }
      neighbours.push(line[hIndex - 1]);
      neighbours.push(line[hIndex + hLength]);


      const isEngine = neighbours.some(char => char && char.match(/[^0-9.]/))
      if (isEngine) {
        engineParts.push(number)
      }
    }
  })

  return engineParts
}).then((result) => {
  console.log(result.reduce((a, b) => a + b, 0))
})
