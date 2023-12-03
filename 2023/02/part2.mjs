import { readFile} from "node:fs/promises"

//Determine which games would have been possible if the
// bag had been loaded with
// only 12 red cubes, 13 green cubes, and 14 blue cubes.
// What is the sum of the IDs of those games?

const RULE = {
  green: 13,
  blue: 14,
  red: 12
};
let endResult = [];

const lineRegex = /Game ([0-9]+): (.*)/
const greenRegex = /(\d+)\s*green/;
const blueRegex = /(\d+)\s*blue/;
const redRegex = /(\d+)\s*red/;

readFile("input", "utf8").then(input => {
  input.split("\n").forEach(line => {
    if (!lineRegex.test(line)) return
    const [_, gameId, results] = lineRegex.exec(line);

    const gameResults = results.split(";")
    let maxGreen = 0;
    let maxBlue = 0;
    let maxRed = 0;
    gameResults.forEach(gameResult => {
      let green = greenRegex.exec(gameResult);
      if (green && green[1] && parseInt(green[1],10) > maxGreen) {
        maxGreen = parseInt(green[1], 10);
      }
      let blue = blueRegex.exec(gameResult);
      if (blue && blue[1] && parseInt(blue[1],10) > maxBlue) {
        maxBlue = parseInt(blue[1], 10);
      }
      let red = redRegex.exec(gameResult);
      console.log({red, maxRed})
      if (red && red[1] && parseInt(red[1], 10) > maxRed) {
        maxRed = parseInt(red[1], 10);
      }
    })
    console.log({gameId, maxGreen, maxBlue, maxRed})
    endResult.push(maxBlue * maxGreen * maxRed);

  })
}).then(() => {
  console.log(endResult, endResult.reduce((a, b) => a + b, 0))
})
