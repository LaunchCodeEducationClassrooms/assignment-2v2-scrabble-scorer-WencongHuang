// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const englishAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const vowelANDConsonants = {
  1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
  3: ['A', 'E', 'I', 'O', 'U']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
  let totalPoint = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      totalPoint += Number(pointValue);
		 }
 
	  }
	}
	return [letterPoints, totalPoint];
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  // console.log("Let's play some scrabble! \n\nEnter a word:");
  let theWord = input.question("Let's play some scrabble!\n\nEnter a word: ");

  return theWord;
};

let simpleScore = function(word) {
  word = word.toUpperCase();
  let letterPoints = "";
  let totalPoint = 0;
 
	for (let i = 0; i < word.length; i++) {
 
    if (englishAlphabet.includes(word[i])) {
      letterPoints += `Points for '${word[i]}': 1\n`
      totalPoint++;
    }
 
	}
	return [letterPoints, totalPoint];
};

let vowelBonusScore = function(word) {
  word = word.toUpperCase();
  let letterPoints = "";
  let totalPoint = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in vowelANDConsonants) {
 
		 if (vowelANDConsonants[pointValue].includes(word[i])) {
		  letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      totalPoint += Number(pointValue);
		 }
 
	  }
	}
	return [letterPoints, totalPoint];
};

let scrabbleScore = function(word) {
  word = word.toLowerCase();
  let letterPoints = "";
  let totalPoint = 0;
 
	for (let i = 0; i < word.length; i++) {
    if (word[i] in newPointStructure) {
      letterPoints += `Points for '${word[i]}': ${newPointStructure[word[i]]}\n`
      totalPoint += Number(newPointStructure[word[i]]);
    }
 
	}
	return [letterPoints, totalPoint];
};

const scoringAlgorithms = [
{
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  socreFunction: simpleScore
},
{
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  socreFunction: vowelBonusScore
},
{
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  socreFunction: scrabbleScore
}];

function scorerPrompt() {
  let choice = Number(input.question(
`Which scoring algorithm would you like to use?
0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 Points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `
  ));
  while(choice !== 0 && choice !== 1 && choice !== 2) {
    console.log("\nERROR! Invalid input!\n");
    choice = Number(input.question(
`Which scoring algorithm would you like to use?
0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 Points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `
    ));
  }
  
  return scoringAlgorithms[choice];
}

function transform(theOldPtStruct) {
  let theNewPtStruct = {}
  for(const key in theOldPtStruct) {
    for(const i in theOldPtStruct[key]) {
      theNewPtStruct[theOldPtStruct[key][i].toLowerCase()] = key;
    }
  }
  return theNewPtStruct;
};

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

function runProgram() {
  let userWord = initialPrompt();
  console.log(`Score for \'${userWord}\': ${scorerPrompt().socreFunction(userWord)[1]}`);
  //console.log(newPointStructure);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScore: simpleScore,
  vowelBonusScore: vowelBonusScore,
  scrabbleScore: scrabbleScore,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

