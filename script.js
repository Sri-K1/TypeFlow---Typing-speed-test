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
/* Stats */
function updateStats() 
{
    const typedText = typingInput.value;
    let correctCharacters = 0;
    for (let i = 0; i < typedText.length; i++) 
    {
        if (typedText[i] === activeParagraph[i]) 
        {
            correctCharacters++;
        }
    }
    const mistakes = typedText.length - correctCharacters;
    currentMistakes = mistakes;
    const accuracy = typedText.length === 0 ? 100 : Math.round((correctCharacters / typedText.length) * 100);
    currentAccuracy = accuracy;
    accuracyDisplay.textContent = `${accuracy}%`;
    const elapsedMinutes = (selectedDuration - timeRemaining) / 60;
    const calculatedWpm = elapsedMinutes > 0 ? Math.round((correctCharacters / 5) / elapsedMinutes): 0;
    currentWpm = calculatedWpm;
    wpmDisplay.textContent = calculatedWpm;
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
