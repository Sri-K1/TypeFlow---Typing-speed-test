const paragraphs = [
    "Building useful skills take patience and effort. Most people overestimate what they can accomplish in a single day and underestimate what they can achieve in a year. Consistent effort, even in small ammounts, often produces impressive results over time",
    "Eye few we consider you problem word must use person then now plan tell early present system out say each because much need show first new no want find high eye under seem so increase these and people in earth want money and everything",
    "Monkey type is a website where people test their typing speed and how they could improve, they usually get a detailed report at the end of the test to see their mistakes and accurary, to make sure they can increase their typing speed as much as possible",
    "Hackclub is a website where teens can participate in you ship we ship events, where they would have to build cool open source projects for amazing prizes in return from hackclub. Some event names are: Beest, Macondo, Stardance, and Flavortown",
    "Many successful projects begin as simple ideas. Instead of trying to build something huge asap, try to focus on creating a polished foundation, so once the core experience feels solid, you could add additional features to make the user interface and user experience better"
]

const promptText = document.getElementById("text");
const typingInput = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const mistakesDisplay = document.getElementById("mistakes");
const restartButton = document.getElementById("restart");
const timeOptions = document.querySelectorAll(".time-btn");
let activeParagraph = "";
let countdownTimer = null;
let selectedDuration = 30;
let timeRemaining = selectedDuration; 
let testStarted = false; 

function chooseRandomPara()
{
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    activeParagraph = paragraphs[randomIndex];
    promptText.textContent = activeParagraph;
}

function startCountdown()
{
    countdownTimer = setInterval(() => {
        timeRemaining--;
        timeDisplay.textContent = timeRemaining;
        if(timeRemaining <= 0)
        {
            clearInterval(countdownTimer);
            typingInput.ariaDisabled = true;
        }
    } , 1000);
}
