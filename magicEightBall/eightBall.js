const answerMagicEightBall = function answerMagicEightBall() {
  // create possible answers
  const answer = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes – definitely.",
    "You may rely on i",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to ye",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask agai.",
    "Don’t count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtfu",
  ];

  //return answer
  let myAnswer = "";
  //created random number for random answer
  let randomNumber = Math.floor(Math.random() * 19);
  myAnswer += answer[randomNumber];

  document.getElementById("result").innerHTML = myAnswer;
};

let dataSend = document.getElementById("dataSend");
dataSend.addEventListener("click", answerMagicEightBall, true);
