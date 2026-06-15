const paragraphs = [
    "Building useful skills take patience and effort. Most people overestimate what they can accomplish in a single day and underestimate what they can achieve in a year. Consistent effort, even in small ammounts, often produces impressive results over time",
    "Eye few we consider you problem word must use person then now plan tell early present system out say each because much need show first new no want find high eye under seem so increase these and people in earth want money and everything",
    "Monkey type is a website where people test their typing speed and how they could improve, they usually get a detailed report at the end of the test to see their mistakes and accurary, to make sure they can increase their typing speed as much as possible",
    "Hackclub is a website where teens can participate in you ship we ship events, where they would have to build cool open source projects for amazing prizes in return from hackclub. Some event names are: Beest, Macondo, Stardance, and Flavortown",
    "Many successful projects begin as simple ideas. Instead of trying to build something huge asap, try to focus on creating a polished foundation, so once the core experience feels solid, you could add additional features to make the user interface and user experience better"
]
/* Elements and setting values */
const promptText = document.getElementById("text");
const typingInput = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const mistakesDisplay = document.getElementById("mistakes");
const restartButton = document.getElementById("restart");
const timeOptions = document.querySelectorAll(".time-btn");
const typingScreen = document.getElementById("typing-screen");
const resultsScreen = document.getElementById("results-screen");
const finalWpm = document.getElementById("final-wpm");
const finalAccuracy = document.getElementById("final-accuracy");
const finalMistakes = document.getElementById("final-mistakes");
const tryAgainbtn = document.getElementById("try-again");
let activeParagraph = "";
let countdownTimer = null;
let selectedDuration = 30;
let timeRemaining = selectedDuration; 
let testStarted = false; 
let currentWpm = 0;
let currentAccuracy = 100;
let currentMistakes = 0;
/* Prompt setup */
function chooseRandomPara()
{
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    activeParagraph = paragraphs[randomIndex];
    promptText.textContent = activeParagraph;
}
/* Results screen */
function showResults()
{
    finalWpm.textContent = currentWpm;
    finalAccuracy.textContent = `${currentAccuracy}%`;
    finalMistakes.textContent = currentMistakes;
    typingScreen.classList.add("hidden");
    resultsScreen.classList.remove("hidden");
}
/* Timer */
function startCountdown()
{
    countdownTimer = setInterval(() => {
        timeRemaining--;
        timeDisplay.textContent = timeRemaining;
        if(timeRemaining <= 0) // Time over to disable typing.
        {
            clearInterval(countdownTimer);
            typingInput.ariaDisabled = true;
            showResults();
        }
    } , 1000);
}
/* Stats */
function updateStats()
{
    const typedText = typingInput.value;
    let correctCharacters = 0;
    let mistakes = 0;
    for(let i = 0; i < typedText.length; i++)
    {
        if(typedText[i] === activeParagraph[i])
        {
            correctCharacters++;
        }
        else
        {
            mistakes++;
        }
    }
    currentMistakes = mistakes;
    mistakesDisplay.textContent = mistakes;
    const accuracy = typedText.length === 0 ? 100: Math.round((correctCharacters/typedText.length)*100);
    currentAccuracy = accuracy;
    accuracyDisplay.textContent = `${accuracy}%`;
    const elapsedMinutes = (selectedDuration - timeRemaining) / 60;
    const calculatedWpm = elapsedMinutes > 0 ? Math.round((correctCharacters/5)/elapsedMinutes) : 0;
    currentWpm = calculatedWpm;
    wpmDisplay.textContent = calculatedWpm;
}
/* Test reset */
function resetTest()
{
    clearInterval(countdownTimer);
    resultsScreen.classList.add("hidden");
    typingScreen.classList.remove("hidden");
    testStarted = false;
    timeRemaining = selectedDuration;
    currentWpm = 0;
    currentAccuracy = 100;
    currentMistakes = 0;
    timeDisplay.textContent = selectedDuration;
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100%";
    mistakesDisplay.textContent = "0";
    typingInput.ariaDisabled = false;
    typingInput.value = "";
    chooseRandomPara();
    typingInput.focus();
}