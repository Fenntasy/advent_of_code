
import { readFile} from "node:fs/promises"

const wordToDigit = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
};

function replaceLastOccurrence(str) {
  const regex = /(?=(one|two|three|four|five|six|seven|eight|nine))/g;
  let lastMatch;
  let match;
  let tempStr = str;

  while ((match = regex.exec(tempStr)) !== null) {
    lastMatch = match;
    tempStr = tempStr.slice(1);
  }

  if (lastMatch) {
    const index = str.lastIndexOf(lastMatch[1]);
    return str.substring(0, index) + wordToDigit[lastMatch[1]] + str.substring(index + lastMatch[1].length);
  }

  return str;
}

readFile("input", "utf8").then(input => {
  const lines = input.split("\n").slice(0, -1)
  const numbers = lines.map(line => {


    let digits = line
      .replace(/(one|two|three|four|five|six|seven|eight|nine)(.*?)([0-9])/, (_, num, random, digit) => wordToDigit[num] + random + digit)

    digits = replaceLastOccurrence(digits)
    digits = digits
      .replaceAll(/[a-zA-Z]/g, "")
      .split("")


    if (digits.length === 1) {
    console.log([line, digits,parseInt(digits[0] + digits[0], 10) ])
      return parseInt(digits[0] + digits[0], 10)
    } else {
    console.log([line, digits, parseInt(digits[0] + digits[digits.length - 1], 10)])
      return parseInt(digits[0] + digits[digits.length - 1], 10)
    }
  })
  console.log(numbers);
  console.log(numbers.reduce((a, b) => a + b, 0))
})
