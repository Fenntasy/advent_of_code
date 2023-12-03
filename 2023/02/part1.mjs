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
    let isPossible = true;
    gameResults.forEach(gameResult => {
      let green = greenRegex.exec(gameResult);
      green = green && green[1] || 0;
      let blue = blueRegex.exec(gameResult);
      blue = blue && blue[1] || 0;
      let red = redRegex.exec(gameResult);
      red = red && red[1] || 0;
      if (green > RULE.green) {
        console.log("Game", gameId, "is not possible because of green: ", gameResult)
        isPossible = false;
      }
      if (blue > RULE.blue) {
        console.log("Game", gameId, "is not possible because of blue: ", gameResult)
        isPossible = false;
      }
      if (red > RULE.red) {
        console.log("Game", gameId, "is not possible because of red: ", gameResult)
        isPossible = false;
      }
    })
    if (isPossible) {
      console.log("Game", gameId, "is possible")
      endResult.push(parseInt(gameId, 10));
    }
  })
}).then(() => {
  console.log(endResult, endResult.reduce((a, b) => a + b, 0))
})
