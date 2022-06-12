function addition(max) {
  const questions = [];
  for (let addend1 = 0; addend1 <= max; addend1 += 1) {
    for (
      let addend2 = 0;
      addend2 <= max && addend1 + addend2 <= max;
      addend2 += 1
    ) {
      questions.push({
        text: `${addend1} + ${addend2}`,
        correctAnswer: `${addend1 + addend2}`,
        givenAnser: '',
      });
    }
  }
  return questions;
}

function subtraction(max) {
  const questions = [];
  for (let minuend = max; minuend >= 0; minuend -= 1) {
    for (let subtrahend = minuend; subtrahend >= 0; subtrahend -= 1) {
      questions.push({
        text: `${minuend} - ${subtrahend}`,
        correctAnswer: `${minuend - subtrahend}`,
        givenAnser: '',
      });
    }
  }
  return questions;
}

function division(max) {
  const questions = [];
  for (let value = 1; value <= max; value += 1) {
    for (let answer = 1; answer <= max; answer += 1) {
      const dividend = value * answer;
      questions.push({
        text: `${dividend} ÷ ${value}`,
        correctAnswer: `${answer}`,
        givenAnser: '',
      });
    }
  }
  return questions;
}

function multiplication(multiplicands, max) {
  const questions = [];
  for (let i = 0; i < multiplicands.length; i += 1) {
    for (let multiplier = 0; multiplier <= max; multiplier += 1) {
      const multiplicand = multiplicands[i];
      questions.push({
        text: `${multiplicand} X ${multiplier}`,
        correctAnswer: `${multiplicand * multiplier}`,
        givenAnser: '',
      });
    }
  }
  return questions;
}

/**
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    // eslint-disable-next-line no-param-reassign
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const questionCreators = {
  '*': multiplication,
  '-': subtraction,
  '+': addition,
  '÷': division,
};

function getQuestionList(questionTypes) {
  return questionTypes.reduce(
    (q, t) => [...q, ...questionCreators[t.type](...t.args)],
    []
  );
}

/**
 * Creates an exam made from an array of questions.
 * All possile questions are created then a radom selection
 * from the full array is made to create the exam.
 */
function createExam(count, questionTypes) {
  let questions = getQuestionList(questionTypes);
  questions = shuffle(questions);
  return questions.slice(0, count);
}

export default createExam;
