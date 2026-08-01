document.addEventListener("DOMContentLoaded", () => 
{
const paragraphs = 
[
    "Building useful skills take patience and effort. Most people overestimate what they can accomplish in a single day and underestimate what they can achieve in a year. Consistent effort, even in small ammounts, often produces impressive results over time",
    "Eye few we consider you problem word must use person then now plan tell early present system out say each because much need show first new no want find high eye under seem so increase these and people in earth want money and everything",
    "Monkey type is a website where people test their typing speed and how they could improve, they usually get a detailed report at the end of the test to see their mistakes and accuracy, to make sure they can increase their typing speed as much as possible",
    "Hackclub is a website where teens can participate in you ship we ship events, where they would have to build cool open source projects for amazing prizes in return from hackclub. Some event names are: Beest, Macondo, Stardance, and Flavortown",
    "Many successful projects begin as simple ideas. Instead of trying to build something huge asap, try to focus on creating a polished foundation, so once the core experience feels solid, you could add additional features to make the user interface and user experience better",
    "Too at could hand say public use so go number such also than between we well than set after who we where group use against look world she first eye would any as those early on between back, people few want it much need a lot to win and lose but it matter nothing",
    "The main thing to do is pay attention. Pay close attention to everything, notice what no one else notices. Then you'll know what no one else knows, and that's always useful for anyone who is using a typing test website like TypeFlow or Monkeytype",
    "I'm not the sweet, forebearing guy that I try to make out that I am. I get irritated at things. I feel like snapping at people, and I feel like being selfish at times; and I don't know why I would ever want to do this to people around me but its bad"
]
const promptText = document.getElementById("text");
const typingInput = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartButton = document.getElementById("restart");
const timeOptions = document.querySelectorAll(".time-btn");
const typingScreen = document.getElementById("typing-screen");
const resultsScreen = document.getElementById("results-screen");
const finalWpm = document.getElementById("final-wpm");
const finalAccuracy = document.getElementById("final-accuracy");
const finalMistakes = document.getElementById("final-mistakes");
const tryAgainBtn = document.getElementById("try-again");
let activeParagraph = "";
let targetWords = []; 
let countdownTimer = null;
let selectedDuration = 30;
let timeRemaining = selectedDuration;
let testStarted = false;
let currentWpm = "";
let currentAccuracy = "";
let currentMistakes = 0;
/* Timer and paragraph functions */
function chooseRandomParagraph() 
{
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    activeParagraph = paragraphs[randomIndex];
    targetWords = activeParagraph.split(" ");
    promptText.textContent = activeParagraph;
}
function showResults() 
{
    finalWpm.textContent = currentWpm;
    finalAccuracy.textContent = `${currentAccuracy}%`;
    finalMistakes.textContent = currentMistakes;
    typingScreen.classList.add("hidden");
    resultsScreen.classList.remove("hidden");
}
function startCountdown() 
{
    countdownTimer = setInterval(() => 
    {
        timeRemaining--;
        timeDisplay.textContent = timeRemaining;
        if (timeRemaining <= 0) 
        {
            clearInterval(countdownTimer);
            typingInput.disabled = true;
            showResults();
        }
    }, 1000);
}
function wordSimilarity(a, b) 
{
    if (!a.length || !b.length) return 0;
    let matches = 0;
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) 
    {
        if (a[i] === b[i]) matches++;
    }
    return matches / Math.max(a.length, b.length);
}
function updateStats() 
{
    const typedText = typingInput.value;
    const typedWords = typedText.length ? typedText.split(" ") : [];
    let correctCharacters = 0;
    let typedCharacters = 0;
    let t = 0;
    for (let w = 0; w < typedWords.length; w++)
    {
    const typedWord = typedWords[w];
    const isLastTypedWord = w === typedWords.length - 1;
        if (t >= targetWords.length)
        {
            if (!isLastTypedWord) continue;
            break;
        }
    const targetWord = targetWords[t];
    const currentMatch = wordSimilarity(typedWord, targetWord);
     const nextTypedWord = typedWords[w + 1];
    const nextMatch = nextTypedWord ? wordSimilarity(nextTypedWord, targetWord) : 0;
    if (!isLastTypedWord && currentMatch < 0.5 && nextMatch > currentMatch)
    {
    typedCharacters += typedWord.length + 1;
    continue;
    } 
    for (let i = 0; i < typedWord.length; i++)
    {
        typedCharacters++;
        if (typedWord[i] === targetWord[i])
        {
            correctCharacters++;
        }
    }
        if (!isLastTypedWord && w < targetWords.length - 1)
        {
            typedCharacters++;
            correctCharacters++;
        }
        t++;
    }
    const mistakes = typedCharacters - correctCharacters;
    currentMistakes = mistakes;
    const accuracy = typedCharacters === 0 ? 100 : Math.round((correctCharacters / typedCharacters) * 100);
    currentAccuracy = accuracy;
    accuracyDisplay.textContent = `${accuracy}%`;
    const elapsedMinutes = (selectedDuration - timeRemaining) / 60;
    const calculatedWpm = elapsedMinutes > 0 ? Math.round((correctCharacters / 5) / elapsedMinutes): 0;
    currentWpm = calculatedWpm;
    wpmDisplay.textContent = calculatedWpm;
}
function typedTextScore(typedText) {
  const chars = promptEl.children;
  for (let i = 0; i < chars.length; i++) 
{
    chars[i].className = "char pending";
  }
  const typedWords = typedText.length ? typedText.split(" ") : [];
  let correctChars = 0;
  let typedChars = 0;
  let charIndex = 0;

for (let w = 0; w < typedWords.length; w++) 
{
    const typedWord = typedWords[w];
    const isLastTypedWord = w === typedWords.length - 1;
    if (w >= targetWords.length) 
    {
      if (!isLastTypedWord) continue; 
      break;
    }
    const targetWord = targetWords[w];
    for (let i = 0; i < typedWord.length; i++) 
    {
      typedChars++;
      const targetChar = targetWord[i];
      const isCorrect = targetChar !== undefined && typedWord[i] === targetChar;
      if (isCorrect) correctChars++;

      if (targetChar !== undefined && charIndex < chars.length) 
    {
        chars[charIndex].classList.remove("pending");
        chars[charIndex].classList.add(isCorrect ? "correct" : "incorrect");
        charIndex++;
      }
    }
    if (!isLastTypedWord && w < targetWords.length - 1) 
    {
      typedChars++;
      correctChars++;
      if (charIndex < chars.length) {
        chars[charIndex].classList.remove("pending");
        chars[charIndex].classList.add("correct");
        charIndex++;
      }
    }
  }
  updateCaret(charIndex);
  return {correctChars, typedChars};
}
/* Restart test */
function resetTest() 
{
    clearInterval(countdownTimer);
    typingScreen.classList.remove("hidden");
    resultsScreen.classList.add("hidden");
    testStarted = false;
    timeRemaining = selectedDuration;
    currentWpm = 0;
    currentAccuracy = 100;
    currentMistakes = 0;
    timeDisplay.textContent = selectedDuration;
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100%";
    typingInput.disabled = false;
    typingInput.value = "";
    chooseRandomParagraph();
}
/* Event listeners */ 
typingInput.addEventListener("input", () => 
{
    if (!testStarted) 
    {
        testStarted = true;
        startCountdown();
    }
    updateStats();
});
restartButton.addEventListener("click", resetTest);
tryAgainBtn.addEventListener("click", resetTest);
timeOptions.forEach((option) => 
{
option.addEventListener("click", () => 
{
    timeOptions.forEach((button) => button.classList.remove("active"));
    option.classList.add("active");
    selectedDuration = Number(option.dataset.time);
    resetTest();
    });
});
    chooseRandomParagraph();
    resetTest();
});
